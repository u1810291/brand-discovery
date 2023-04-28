// WARN: deprecated

export function levenshteinDistance(a, strs) {
  const filtered =
    a &&
    strs.flatMap(({ name }) => {
      if (a.length == 0) return name.length
      if (name.length == 0) return a.length
      const matrix = []
      let i
      for (let i = 0; i <= name.length; i++) {
        matrix[i] = [i]
      }
      let j
      for (j = 0; j <= a.length; j++) {
        matrix[0][j] = j
      }
      for (i = 1; i <= name.length; i++) {
        for (j = 1; j <= a.length; j++) {
          if (name.charAt(i - 1) == a.charAt(j - 1)) {
            matrix[i][j] = matrix[i - 1][j - 1]
          } else {
            matrix[i][j] = Math.min(
              matrix[i - 1][j - 1] + 1, // substitution
              Math.min(
                matrix[i][j - 1] + 1, // insertion
                matrix[i - 1][j] + 1,
              ),
            ) // deletion
          }
        }
      }
      return { distance: matrix[name.length][a.length], name }
    })
  return filtered
}
