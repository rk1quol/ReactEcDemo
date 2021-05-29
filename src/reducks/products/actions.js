export const ADD = 'ADD'
export const INDEX = 'INDEX'

export const indexAction = (context) => {
  return {
    type: 'INDEX',
    payload: {
      name: context.name,
      description: context.description,
      price: context.price,
      category: context.category,
      gender: context.gender,
    }
  }
}