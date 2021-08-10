import { useRef, useEffect } from 'react'

export default function useDocumentTitle(title, prevailOnUnmount = false, shouldRestart = false) {
    const defaultTitle = useRef(document.title);
    const titlePrefix = 'شرکت مریخ (لوتوس) -'

    useEffect(() => {
        document.title = `${titlePrefix} ${title}`;

        if (shouldRestart) {
            document.title = "شرکت مریخ (لوتوس)";
        }
    }, [title]);

    useEffect(() => () => {
        if (!prevailOnUnmount) {
            document.title = defaultTitle.current;
        }

    }, [])
}
