import os
import sys
import json
import urllib
import datetime

from arcgis.gis import GIS

THIS_DIR = os.path.dirname(os.path.abspath(__file__))
LOGS_DIR = os.path.join(THIS_DIR, "logs")
os.makedirs(LOGS_DIR, exist_ok=True)

# Base URL of the awdb API
API_DOMAIN = os.getenv("API_DOMAIN", "https://api.snowdata.info/")

# Feature Services IDs
FS_IDS = {
    "basin": "2b3d9f10da71484d8adf1b53a69cdb6d",
    "station": "fbc0a34b61d14a0eb168832a24077e41",
}

# List of state codes
BASIN_STATES = ["UT", "CO", "NV"]

# List of metrics for which we want to get data from the API
METRICS = ["Prec", "Res", "Snow"]

# List of basin types for which we want to get data from the API
BASIN_TYPES = ["major", "misc"]

# get username and password from env vars
AGOL_URL = os.getenv("AGOL_URL", "https://nrcs.maps.arcgis.com/home/")
if not AGOL_URL.endswith("/"):
    AGOL_URL = f"{AGOL_URL}/"
USERNAME = os.getenv("AGOL_USERNAME", False)
PASSWORD = os.getenv("AGOL_PASSWORD", False)

if not any((USERNAME, PASSWORD)):
    print(
        "Could not obtain credentials from sys env vars, enter them now."
    )
    USERNAME = input("Enter agol username: ")
    PASSWORD = input("Enter agol password: ")
    if not any((USERNAME, PASSWORD)):
        print("You must enter credentials in order to update layers, try again...")
        sys.exit(1)

if __name__ == "__main__":
    
    today = datetime.date.today()
    month = today.strftime("%m")
    year = today.strftime("%Y")
    
    gis = GIS(AGOL_URL, USERNAME, PASSWORD)
    store = {}

    for feature_type, id in FS_IDS.items():
        fs = gis.content.get(id)
        store[f"{feature_type}_fs"] = fs
        store[f"{feature_type}s"] = {}

    # Loop through states
    for state_code in BASIN_STATES:
        print(f"Working on {state_code}...")
        # Loop through metrics (Prec, Snow, Res)
        for metric_name in METRICS:
            print(f"  Working on {metric_name}...")
            # Loop through basin tpyes (major, misc)
            for basin_type in BASIN_TYPES:
                print(f"    Working on {basin_type}...")
                # Get metric data for the state from the API
                args = f"state={state_code}&pubMonth={month}&pubYear={year}"
                args = f"{args}&basinType={basin_type}&format=json" 
                response = urllib.request.urlopen(
                    f"{API_DOMAIN}/wsor/get{metric_name}Data?{args}".replace(
                        "//wsor", "/wsor"
                    )
                )
                data = json.loads(response.read())

                # Loop through all basins returned by the API
                for basin_name, basin_data in data.items():
                    print(f"      Working on {basin_name}...")
                    # Add basin meta data and values to our basins dict in store.
                    # If the basin already exists in store, just add the values
                    if basin_type != "misc":
                        basin = {
                            **basin_data["basin_meta"],
                            **basin_data["basin_index"],
                        }
                        if basin_name in store["basins"]:
                            basin = {
                                **store["basins"][basin_name],
                                **basin_data["basin_index"],
                            }
                        store["basins"][basin_name] = basin

                    ## Add the state's fields to each basin within the state
                    elif "state" in basin_name:

                        # Get all state fields and append '_state' to the end of each
                        state_fields = {}
                        for field_name, value in basin_data["basin_index"].items():
                            state_fields[f"{field_name}_state"] = value

                        # Add state fields to each basin
                        for b_n, b in store["basins"].items():
                            if state_code in b["states"]:
                                store["basins"][b_n] = {**b, **state_fields}

                    # Add site meta data to sites list OR
                    # Add basin name to the site's basin list if
                    # the site already exists in our store
                    if basin_type != "misc":
                        for site_triplet, site_meta in basin_data["site_meta"].items():

                            site = {"basins": [], "state": state_code, **site_meta}

                            # Add stored data to site
                            if site_triplet in store["stations"]:
                                site = {**site, **store["stations"][site_triplet]}

                            # Add basin to site's basin list
                            # Ignore basin name if handeing 'misc' basins
                            b_name = basin_data["basin_meta"]["name"]
                            if b_name not in site["basins"]:
                                site["basins"].append(b_name)

                            # Add reservoir calculations to site attributes
                            if metric_name == "Res":

                                def getValue(n, d):
                                    numerator = basin_data[n][site_triplet]
                                    denominator = basin_data[d][site_triplet]
                                    if numerator != None and denominator != None:
                                        return round(
                                            (numerator / denominator) * 100,
                                        )
                                    else:
                                        return None

                                site["res_curr_per_cap"] = getValue(
                                    "res_curr", "res_cap"
                                )  # Current % Cap
                                site["res_curr_per_med"] = getValue(
                                    "res_curr", "res_med"
                                )  # Current % Med
                                site["res_ly_per_cap"] = getValue(
                                    "res_ly", "res_cap"
                                )  # Lasy Year % Cap
                                site["res_ly_per_med"] = getValue(
                                    "res_ly", "res_med"
                                )  # Last Year % Med

                            # Update store
                            store["stations"][site_triplet] = site

                        # Add site values to the site in our store
                        for key, obj in basin_data.items():
                            if key not in ["basin_meta", "site_meta", "basin_index"]:
                                for site_triplet, value in obj.items():
                                    store["stations"][site_triplet][key] = value

    print("Updating feature layers...")
    # Loop through all feature_types (basin, station, reservoir)
    for feature_type, fs_id in FS_IDS.items():
        print(f"  Updating {feature_type}...")
        # Loop through each layer of feature service
        for layer in store[f"{feature_type}_fs"].layers:
            data = layer.query()
            fs_features = data.features

            # Loop through all features in the feature service
            for fs_feature in fs_features:

                # Determine what attribute is used as the feature's key
                if feature_type == "basin":
                    ref = fs_feature.attributes["name"].lower()
                else:
                    ref = fs_feature.attributes["stationTriplet"]

                # Find the corresponding feature in our store
                if ref in store[f"{feature_type}s"]:
                    new_feature = store[f"{feature_type}s"][ref]
                else:
                    continue

                # Loop through all of the feature's fields
                for field_name, field_value in new_feature.items():

                    # Join basin names into string
                    if field_name == "basins":
                        fs_feature.attributes[field_name] = ", ".join(
                            new_feature[field_name]
                        )

                    # Update the fs_feature's attributes with values from
                    # the corresponding feature in store
                    elif field_name in fs_feature.attributes:
                        fs_feature.attributes[field_name] = new_feature[field_name]

                # Update the time fields of the feature
                fs_feature.attributes["updated_at"] = today
                fs_feature.attributes["month_int"] = month

            # Push updates to feature service
            updates = layer.edit_features(
                updates=fs_features, rollback_on_failure=False
            )

            # Print fialed updates
            print(f"------------- {feature_type} failures -------------")
            for result in updates["updateResults"]:
                if result["success"] == False:
                    print(result)
