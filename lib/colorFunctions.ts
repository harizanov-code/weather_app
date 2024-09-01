import { FastAverageColor, FastAverageColorResult } from 'fast-average-color'

const fac = new FastAverageColor()

export const getAverageColor = async (
  src: string
): Promise<{ isLight: boolean; isDark: boolean }> => {
  const response = await fac.getColorAsync(src)
  const { isLight, isDark } = response
  return { isLight, isDark }
}
