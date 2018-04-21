import { Map, List } from 'immutable';

export function getEntityField(item, RecordModel, feild) {
    const keys = new RecordModel().keySeq().toArray();
    const entity = {};

    keys.forEach((key) => { entity[key] = feild ? item[feild][key] : item[key]; });

    return entity;
}

export function getEntitiesField(data, feild, RecordModel) {
    return data.map(item => getEntityField(item, RecordModel, feild));
}

export function dataToEntities(data, RecordModel = Map) {
    return (new List(data)).map(entity => new RecordModel(entity));
}
