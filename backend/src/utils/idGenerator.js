const padSequence = (value, length = 5) => {
  const stringValue = `${value}`;
  return stringValue.padStart(length, "0");
};

export const generateRegistrationId = ({ orgCode, formCode, sequence }) => {
  const safeOrg = orgCode.toUpperCase().replace(/[^A-Z0-9]/g, "-");
  const safeForm = formCode.toUpperCase().replace(/[^A-Z0-9]/g, "-");
  return `${safeOrg}-${safeForm}-${padSequence(sequence)}`;
};
