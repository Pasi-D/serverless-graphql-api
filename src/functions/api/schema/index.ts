import builder from "./builder";

const UserInput = builder.inputType("UserInput", {
    fields: (t) => ({
        firstName: t.string({ required: true }),
        lastName: t.string({ required: true }),
        email: t.string({ required: true }),
        profileName: t.string({ required: true })
    })
});

const PostInput = builder.inputType("PostInput", {
    fields: (t) => ({
        authorId: t.int({ required: true }),
        title: t.string({ required: true, description: "Title of the post" }),
        content: t.string({
            description: "Content of the post",
            defaultValue: ""
        })
    })
});

builder.prismaObject("User", {
    fields: (t) => ({
        id: t.exposeID("id"),
        firstName: t.exposeString("firstName"),
        lastName: t.exposeString("lastName"),
        fullName: t.string({
            resolve: (user) => `${user.firstName} ${user.lastName}`
        }),
        email: t.exposeString("email"),
        profile: t.relation("profile")
    })
});

builder.prismaObject("Profile", {
    fields: (t) => ({
        id: t.exposeID("id"),
        username: t.exposeString("username"),
        user: t.relation("User"),
        posts: t.relation("Post")
    })
});

builder.prismaObject("Post", {
    fields: (t) => ({
        id: t.exposeID("id"),
        title: t.exposeString("title"),
        content: t.exposeString("content"),
        author: t.relation("Profile")
    })
});

builder.queryType({
    fields: (t) => ({
        user: t.prismaField({
            type: "User",
            nullable: true,
            args: {
                id: t.arg.id({ required: true })
            },
            resolve: (query, _root, args, ctx) =>
                ctx.prisma.user.findUnique({
                    ...query,
                    where: { id: Number.parseInt(String(args.id), 10) }
                })
        }),
        profile: t.prismaField({
            type: "Profile",
            nullable: true,
            args: {
                id: t.arg.id({ required: true })
            },
            resolve: (query, _root, args, ctx) =>
                ctx.prisma.profile.findUnique({
                    ...query,
                    where: { id: Number.parseInt(String(args.id), 10) }
                })
        }),
        post: t.prismaField({
            type: "Post",
            nullable: true,
            args: {
                id: t.arg.id({ required: true })
            },
            resolve: (query, _root, args, ctx) =>
                ctx.prisma.post.findUnique({
                    ...query,
                    where: { id: Number.parseInt(String(args.id), 10) }
                })
        })
    })
});

builder.mutationType({
    fields: (t) => ({
        createUser: t.prismaField({
            type: "User",
            args: {
                input: t.arg({ type: UserInput, required: true })
            },
            resolve: (_query, _root, args, ctx) =>
                ctx.prisma.user.create({
                    data: {
                        email: args.input.email,
                        firstName: args.input.firstName,
                        lastName: args.input.lastName,
                        profile: {
                            create: {
                                username: args.input.profileName
                            }
                        }
                    }
                })
        }),
        createPost: t.prismaField({
            type: "Post",
            args: {
                input: t.arg({ type: PostInput, required: true })
            },
            resolve: (_query, _root, args, ctx) =>
                ctx.prisma.post.create({
                    data: {
                        title: args.input.title,
                        content: args.input.content,
                        authorId: args.input.authorId
                    }
                })
        })
    })
});

const schema = builder.toSchema({});

export default schema;
