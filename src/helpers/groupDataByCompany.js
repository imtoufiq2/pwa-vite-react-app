export const groupDataByCompany = (data) => {
    const groupedByCompany = data.reduce((acc, current, index) => {
      const { CompanyName, CommitteeName, CommitteeID } = current;

      if (!acc[CompanyName]) {
        acc[CompanyName] = {
          CompanyName,
          CompanyID: index + 1,
          Committees: [],
        };
      }
      acc[CompanyName].Committees.push({ CommitteeName, CommitteeID });
      return acc;
    }, {});
    return Object.values(groupedByCompany);
  };