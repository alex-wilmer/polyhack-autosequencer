import { range } from "lodash";
export default (freq, numOctaves) => range(1, numOctaves).map(x => freq * x);
