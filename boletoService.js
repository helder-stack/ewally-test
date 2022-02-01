
const validateBoleto = async (barCode) => {

  try {

    barCode = await validateBarCode(barCode)


    if (barCode.length == 48) {
      return concessionariaCode(barCode)
    }

    let expirationCode = barCode.substr(30, 4)
    date = CalcAndFormatDate(expirationCode)

    let amount = barCode.substr(37, 44)
    amount = [amount.slice(0, amount.length - 2), amount.slice(amount.length - 2)].join('.')
    amount = parseFloat(amount).toFixed(2)


    return {
      boleto: {
        barCode,
        amount,
        expirationCode: date
      }
    }

  } catch (e) {

    return {
      status: 400,
      message: e.message
    }

  }
}

const concessionariaCode = async (barCode) => {
  let fields = {
    productId: '',
    segmentId: '',
    realValurOrReferenceId: '',
    geralDigitChecker: '',
    amount: '',
    companyId: '',
    cnpjMF: '',
    freeField: '',
    barCode
  }

  fields.productId = barCode.substr(11, 1)
  fields.segmentId = barCode.substr(23, 1)
  fields.realValurOrReferenceId = barCode.substr(35, 1)
  fields.geralDigitChecker = barCode.substr(47, 1)

  fields.amount = barCode.substr(4, 11)
  fields.amount = parseFloat(fields.amount).toFixed(2)

  fields.companyId = barCode.substr(15, 4)
  fields.cnpjMF = barCode.substr(15, 8)
  fields.freeField = barCode.substr(23, 44)

  fields.barCode = barCode

  return {
    concessionaria: {
      ...fields
    }
  }
}

const validateBarCode = barCode => {
  if (isNaN(barCode)) {
    throw new Error('Not acceptable! Barcode must have only numbers')
  }

  if (barCode.length == 47) {
    barCode = barCode.substr(3, 44)
    return barCode
  }

  if (barCode.length < 44 || barCode.length > 44 && barCode.length != 48) {
    throw new Error('Not acceptable! Barcode must have 44 chars')
  }

  return barCode
}

const CalcAndFormatDate = expirationCode => {
  let currentDate = new Date()
  let futureDate = new Date('2025-02-22')

  let date = (currentDate < futureDate) ? new Date('1997-10-07') : new Date('2025-02-23')
  date = date.setDate(date.getDate() + parseInt(expirationCode))
  date = new Date(date)

  let day = date.getDate() + 1, month = date.getMonth() + 1, year = date.getFullYear();
  date = `${year}-${(month < 10) ? '0' + month : month}-${(day < 10) ? '0' + day : day}`

  return date
}

module.exports = {
  validateBoleto
}