import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Index({ auth, posts }) {
    // console.log(posts);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Posts
                </h2>
            }
        >
            <Head title="Posts" />

            <div className="max-w-2xl mx-auto my-12 space-y-12">
                {posts.data.map((post) => {
                    return (
                        <div key={post.id}>
                            <h1 className="font-bold text-3xl">
                                {post.id}: {post.title}
                            </h1>
                            <p className="mt-2 text-lg">{post.teaser}</p>
                        </div>
                    );
                })}
            </div>
        </AuthenticatedLayout>
    );
}
