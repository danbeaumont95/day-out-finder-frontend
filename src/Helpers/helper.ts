interface Position {
  lat: number;
  lng: number;
}

interface MarkerObject {
    id: number;
    pos: Position
    name: string;
}

const removeNonUniqueObjectsFromArrayBasedOnObjectValue = (arr: MarkerObject[]) => {

const check = (accum: MarkerObject[], el: MarkerObject, value: keyof MarkerObject) => {
  const isUnique = +(!accum.filter((e: MarkerObject) => e[value] === el[value]).length) > 0
  return isUnique
}

  const uniquePlaces = arr.reduce((accum: MarkerObject[], el: MarkerObject) => {
    // if accum array doesnt include id of mapped element, then push to accum, else dont
    if (check(accum, el, 'id') && check(accum, el, 'name')) {
      accum.push(el);
    }
    return accum;
  }, []);
  return uniquePlaces
}

const Helpers = {
  removeNonUniqueObjectsFromArrayBasedOnObjectValue
}

export default Helpers
