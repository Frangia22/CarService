/**
 * Determines the limit and offset for paging.
 * @param { Number } [page = 0] - page index, start at 0
 * @param { Number } [size = 5]  - size of pages
 * @returns { Object } - {limit, offset}
 */
const getPagination = async (page, size) => {
  const limit = size ? +size : 5 // default value
  const offset = page ? page * limit : 0 // page 0 is default
  return { limit, offset }
}

/**
   * Paginate search data
   * @param { Object } data - Data object
   * @param { Number } [page = 0] - page index, start at 0 -
   * @param { Number } limit - limit of rows per pages
   * @returns { Object } - {products, totalItems, totalPages, currentPage}
   */
const PaginateData = async (data, page, limit) => {
  const { count: totalItems, rows: dataRow } = data
  const currentPage = page ? +page : 0
  const totalPages = Math.ceil(totalItems / limit)

  return { dataRow, totalItems, totalPages, currentPage }
}

module.exports = { getPagination, PaginateData }
