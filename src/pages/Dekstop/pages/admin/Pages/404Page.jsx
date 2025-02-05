import React from 'react';

export default function Page404() {
    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen space-y-2">
                <img src="/assets/404-error.png" className="w-40" alt="" />
                <div>Maaf halaman ini tidak bisa di akses melalui desktop</div>
            </div>
        </>
    );
}
