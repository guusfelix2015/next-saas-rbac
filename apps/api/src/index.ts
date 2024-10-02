import { defineAbilityFor } from '@saas/auth'

const ability = defineAbilityFor({ role: 'MEMBER', id: '123' })

console.log(ability.can('get', 'Billing'))
