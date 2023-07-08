"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import Button from "@/components/Button";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import { useUser } from "@/hooks/useUser";
import { postData } from "@/libs/helpers";

const AccountContent = () => {
    const router = useRouter();
    const subscribeModal = useSubscribeModal();
    const { isLoading, subscription, user } = useUser();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/');
        }
    }, [isLoading, user, router]);

    const redirectToCustomerPortal = async () => {
        setLoading(true);
        try {
            const { url, error } = await postData({
                url: '/api/create-portal-link'
            });
            window.location.assign(url);
        } catch (error) {
            console.log(error)
            if (error) return toast.error((error as Error).message);
        }
        setLoading(false);
    };

    return (
        <div className="mb-7 px-6">
            <div className="flex flex-col gap-y-4">
                {user && (
                    <p> Your current session is authenticated using the email address
                        <b> {user?.email}</b>
                    </p>
                )}
                {!subscription && (
                    <>
                        <p>No active plan.</p>
                        <Button
                            onClick={subscribeModal.onOpen}
                            className="w-[300px]"
                        >
                            Subscribe
                        </Button>
                    </>
                )}
                {subscription && (
                    <>
                        <p>You are currently on the
                            <b> {subscription?.prices?.products?.name} </b>
                            plan.
                        </p>
                        <Button
                            disabled={loading || isLoading}
                            onClick={redirectToCustomerPortal}
                            className="w-[244px] sm:w-[300px]"
                        >
                            Open customer portal
                        </Button>
                    </>
                )}
            </div>

        </div>
    );
}

export default AccountContent;