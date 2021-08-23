// COMMON HTTP CLIENT
import { genericGet as get, genericPost as post } from "./httpClient";

// API RESOURCES
import Info from './info';

export default {
  info: Info(get, post)
};