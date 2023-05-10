import { newModel, StringAdapter } from "casbin";

export const model = newModel(`
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act, eft

[role_definition]
g = _, _

[policy_effect]
e = some(where (p.eft == allow)) && !some(where (p.eft == deny))

[matchers]
m = g(r.sub, p.sub) && keyMatch(r.obj, p.obj) && regexMatch(r.act, p.act)
`);

export const adapter = new StringAdapter(`

p, admin, *, (list)|(create)|(edit)|(show)|(delete)
// p, admin, */*, (edit)|(show)|(delete)
// p, admin, */*,  field

// p, admin, /, (list)|(create)|(edit)|(show)|(delete)

// p, admin, technicians, (list)|(create)|(edit)|(show)|(delete)
// p, admin, technicians/*, (edit)|(show)|(delete)
// p, admin, technicians/*, field

// p, admin, departments, (list)|(create)|(edit)|(show)|(delete)
// p, admin, departments/*, (edit)|(show)|(delete)
// p, admin, departments/*, field

// p, admin, prosthetics, (list)|(create)|(edit)|(show)|(delete)

// p, admin, 3d_objects, (list)|(create)|(edit)|(show)|(delete)
// p, admin, 3d_objects/*, (edit)|(show)|(delete)
// p, admin, 3d_objects/*, field

// p, admin, categories, (list)|(create)|(edit)|(show)|(delete)
// p, admin, categories/*, (edit)|(show)|(delete)
// p, admin, categories/*, field

// p, admin, users, (list)|(create)
// p, admin, users/*, (edit)|(show)|(delete)

p, laboratory, posts, (list)|(create)
p, laboratory, posts/*, (edit)|(show)
p, laboratory, posts/hit, field, deny

p, laboratory, categories, list

p, tehnician, posts, (list)|(create)
p, tehnician, posts/*, (edit)|(show)
p, tehnician, posts/hit, field, deny

p, tehnician, categories, list

p, hospital, posts, (list)|(create)
p, hospital, posts/*, (edit)|(show)
p, hospital, posts/hit, field, deny

p, hospital, categories, list

p, doctor, posts, (list)|(create)
p, doctor, posts/*, (edit)|(show)
p, doctor, posts/hit, field, deny

p, doctor, categories, list

`);
