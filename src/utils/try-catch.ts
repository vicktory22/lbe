import { Err, Ok, Result } from "@sniptt/monads";

export async function fromPromise<T>(
  fn: Promise<T>,
): Promise<Result<T, Error>> {
  try {
    return Ok(await fn);
  } catch (e) {
    if (e instanceof Error) {
      return Err(e);
    }

    return Err(defaultError(e));
  }
}

export function fromThrowable<T>(fn: () => T): Result<T, Error> {
  try {
    return Ok(fn());
  } catch (e) {
    if (e instanceof Error) {
      return Err(e);
    }

    return Err(defaultError(e));
  }
}

function defaultError(error: unknown): Error {
  return new Error("An unknown error has occurred", { cause: error });
}
