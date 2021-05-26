interface dataExtract {
  operationDate: Date;
  operationType: number;
  localType: string;
  details: string;
  dz: number;
}

export const convertArray = (array: dataExtract) => {
  let arrayData: any[] = [];
  Object.values(array).map(extract => {
    arrayData.push([
      convertDate(extract.operationDate),
      getTypeOperation(extract.operationType),
      extract.localType,
      extract.details,
      extract.dz,
    ]);
  });
  return arrayData;
};

export const convertObject = (data: dataExtract) => {
  let array: any = Object.values(data);
  array[0] = convertDate(data.operationDate);
  array[1] = getTypeOperation(data.operationType);
  array[2] = data.localType;
  array[3] = data.details;
  array[4] = data.dz;
  array.pop();
  array.pop();
  return array;
};

function getTypeOperation(valueOperation: number) {
  let type;
  switch (valueOperation) {
    case 0:
      type = 'EXPIRAÇÃO';
      break;
    case 1:
      type = 'CRÉDITO';
      break;
    case 2:
      type = 'DÉBITO';
      break;
    case 3:
      type = 'TROCA';
      break;
  }
  return type;
}

function convertDate(date: Date) {
  let newDate = new Date(date),
    dia = newDate.getDate().toString(),
    diaF = dia.length === 1 ? '0' + dia : dia,
    mes = (newDate.getMonth() + 1).toString(),
    mesF = mes.length === 1 ? '0' + mes : mes,
    anoF = newDate.getFullYear();
  return `${diaF}/${mesF}/${anoF}`;
}
