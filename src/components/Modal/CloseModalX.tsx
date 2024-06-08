"use client";

import { useRouter } from "next/navigation";

export default function CloseModalX({ children }) {
    const router = useRouter();
    const close = router.back;

    return <button onClick={close}>{children}</button>;
}
