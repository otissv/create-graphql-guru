
export default class Club {
    id (value) {
      if (value.length < 2) {
        return { error: `Length Error: ${data} length is too short` };
      }
      return value;
    }
}