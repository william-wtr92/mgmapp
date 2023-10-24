const { pbkdf2: pbkdf2Callback, randomBytes } = require("crypto")
const { promisify } = require("util")
const confApi = require("../config.ts")

const pbkdf2 = promisify(pbkdf2Callback)

export const hashPassword = async(
  password: string,
  salt = randomBytes(confApi.security.password.saltlen).toString("hex")
) => [
  (
    await pbkdf2(
      `${password}${confApi.security.password.pepper}`,
      salt,
      confApi.security.password.iterations,
      confApi.security.password.keylen,
      confApi.security.password.digest
    )
  ).toString("hex"),
  salt,
]
