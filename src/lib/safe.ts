/**
 * Handle Promise without Try-Catch (It helps type inference)
 * @param p Promise
 * @returns Try-Catch Processed Result
 */
export async function safeAsync<T = unknown>(
  p: Promise<T>
): Promise<{ success: true; data: T } | { success: false; error: any }> {
  try {
    const data = await p;
    return {
      data,
      success: true,
    };
  } catch (error) {
    return { success: false, error };
  }
}

/**
 * Handle Sync Operation without Try-Catch (It helps type inference)
 * @param operation
 * @returns Try-Catch Processed Result
 * @example () => JSON.parse(12)
 */
export function safeSync<T = unknown>(
  operation: () => T
): { success: true; data: T } | { success: false; error: any } {
  try {
    const data = operation();
    return {
      data,
      success: true,
    };
  } catch (error) {
    return { success: false, error };
  }
}
