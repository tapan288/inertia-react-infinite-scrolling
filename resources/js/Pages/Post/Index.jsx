import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function Index({ auth, posts }) {
    const { ref, inView } = useInView({});
    const [postsData, setPostsData] = useState(posts.data);
    const [path, setPath] = useState(posts.meta.path);
    const [nextCursor, setNextCursor] = useState(posts.meta.next_cursor);

    useEffect(() => {
        if (inView) {
            axios.get(`${path}?cursor=${nextCursor}`).then((response) => {
                setPostsData([...postsData, ...response.data.data]);
                setNextCursor(response.data.meta.next_cursor);
            });
        }
    }, [inView]);

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
                {postsData.map((post) => {
                    return (
                        <div key={post.id}>
                            <h1 className="font-bold text-3xl">
                                {post.id}: {post.title}
                            </h1>
                            <p className="mt-2 text-lg">{post.teaser}</p>
                        </div>
                    );
                })}
                <div ref={ref}></div>
            </div>
        </AuthenticatedLayout>
    );
}
