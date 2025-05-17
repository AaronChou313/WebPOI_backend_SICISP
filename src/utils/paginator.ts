/** 通用分页工具 */
export function buildPager(page = 1, pageSize = 20) {
  const limit  = Math.max(1, Math.min(pageSize, 100)); // 1~100
  const offset = (Math.max(page, 1) - 1) * limit;
  return { limit, offset };
}
