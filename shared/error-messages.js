const illegalSetterUseMessage = (method) =>
`Illegal use of ${method}, state needs to be reset before reassignment.`;

export { illegalSetterUseMessage }