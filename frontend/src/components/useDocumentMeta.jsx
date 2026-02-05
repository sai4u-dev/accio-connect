import { useEffect } from "react";

export function useDocumentMeta({ title }) {
    useEffect(() => {
        if (title) {
            document.title = title;
        }
    }, [title]);
}
