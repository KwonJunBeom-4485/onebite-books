'use client';
import deleteBookAction, { addBookAction } from "@/app/actions/book-actions";
import { useActionState } from "react";


export default function TestBookActionAdd() {

    const [state, formAction, isPending] = useActionState(
        addBookAction,
        null
    );

    return(
        <div className="m-5">
            <h2 className="text-2xl mb-4">create Books Action</h2>
            <form action={formAction}>
                <input className="border p-3 rounded-lg" type="text" name="title" placeholder="책이름 입력"
                disabled={isPending} /><br /><br />
                <input className="border p-3 rounded-lg" type="text" name="author" placeholder="저자 입력" 
                disabled={isPending} /><br /><br />
                <button className="p-2 border rounded-lg bg-blue-400 text-white shadow-sm hover:bg-blue-500"
                disabled={isPending} type="submit">
                    {isPending? '처리중 ...': '도서 정보 추가'}
                </button>
                
            </form>
        </div>
    )
}

export function TestBookActionDelete() {

    const [state, formAction2, isPending] = useActionState(
        deleteBookAction,
        null
    );

    return(
        <div className="m-5">
            <h2 className="text-2xl mb-4">delete Books Action</h2>
            <form action={formAction2}>
                <input className="border p-3 rounded-lg" type="text" name="bookId" placeholder="도서 ID 입력"
                disabled={isPending} /><br /><br />
                <button className="p-2 border rounded-lg bg-blue-400 text-white shadow-sm hover:bg-blue-500"
                disabled={isPending} type="submit">
                    {isPending? '처리중 ...': '도서 삭제'}
                </button>
                
            </form>
        </div>
    )
}