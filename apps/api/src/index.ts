import { ability } from '@saas/auth'

const userCanInviteSomeoneElse = ability.can('invite', 'User')
const userCanDeleteOthersUser = ability.can('delete', 'User')

const userCannotDeleteOthersUser = ability.cannot('delete', 'User')

console.log(userCanInviteSomeoneElse)
console.log(userCanDeleteOthersUser)
console.log(userCannotDeleteOthersUser)
