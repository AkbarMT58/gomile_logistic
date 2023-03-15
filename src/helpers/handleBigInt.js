const handleBigIntResponse = (data) => {
  /* global BigInt */

  const isBigNumber = (num) => !Number.isSafeInteger(+num);
  const enquoteBigNumber = (jsonString, bigNumChecker) =>
    jsonString.replaceAll(
      /([:\s\[,]*)(\d+)([\s,\]]*)/g,
      (matchingSubstr, prefix, bigNum, suffix) =>
        bigNumChecker(bigNum) ? `${prefix}"${bigNum}"${suffix}` : matchingSubstr
    );

  const parseWithBigInt = (jsonString, bigNumChecker) =>
    JSON.parse(enquoteBigNumber(jsonString, bigNumChecker), (key, value) =>
      !isNaN(value) && bigNumChecker(value) ? BigInt(value) : value
    );
  const output = parseWithBigInt(data, isBigNumber);
  const newData = output;

  return newData;
};

const handleBigIntPayload = (data) => {
  const newData = JSON.stringify(data, (_, v) =>
    typeof v === 'bigint' ? `${v}n` : v
  ).replace(/"(-?\d+)n"/g, (_, a) => a);

  return newData;
};

export { handleBigIntResponse, handleBigIntPayload };
