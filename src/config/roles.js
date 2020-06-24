const roles = ['user', 'admin', 'ceo', 'project-manager', 'team-lead', 'hr'];

const roleRights = new Map();

const teamLeadRights = ['addMembers', 'getMembers', 'deleteMembers', 'updateTeam', 'getMyTeams'];

const adminRights = ['getUsers', 'manageUsers', 'createTeam', 'deleteTeam', 'getAllTeams', ...teamLeadRights];

roleRights.set(roles[0], []);
roleRights.set(roles[1], adminRights);
roleRights.set(roles[4], teamLeadRights);

module.exports = {
  roles,
  roleRights,
};
