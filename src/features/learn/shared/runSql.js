export async function runSqlCode(code) {
  // A simple mock for SQL execution to allow UI testing of the courses
  if (!code || code.trim() === "") {
    return { error: "No SQL provided." };
  }

  const query = code.trim().toLowerCase();

  if (query.includes("error") || query.includes("drop table")) {
    return { error: "Execution failed or blocked by policy." };
  }

  // Simulate execution delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    output: `Executed SQL Query locally (Mock Runner):\n\n${code}\n\n[Success] 1 row(s) affected or retrieved.`,
  };
}

export function formatSqlOutput(result) {
  if (!result) return "";
  if (result.error) return result.error;
  return result.output || "";
}

export function getSqlRuntimeError(result) {
  if (!result) return null;
  return result.error || null;
}
