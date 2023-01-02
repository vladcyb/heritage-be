export const errorResponse = (error: string | object) => {
  if (typeof error === 'string') {
    return {
      ok: false,
      error,
    }
  }

  return {
    ok: false,
    errors: error,
  }
}

export const resultResponse = (result: object) => ({
  ok: true,
  result,
})

export const resultArray = (result: any[]) => ({
  ok: true,
  result,
})
