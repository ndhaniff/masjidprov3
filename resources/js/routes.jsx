export const nav = {
    utama: [
        {
            text: "Utama",
            name: "dashboard",
            url: "/",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                        fill="currentColor"
                        d="M13 21V11h8v10h-8zM3 13V3h8v10H3zm6-2V5H5v6h4zM3 21v-6h8v6H3zm2-2h4v-2H5v2zm10 0h4v-6h-4v6zM13 3h8v6h-8V3zm2 2v2h4V5h-4z"
                    />
                </svg>
            ),
        },
    ],
    pengurusan: [
        {
            text: "Qariah",
            name: "qariah",
            url: "/qariah",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                        fill="currentColor"
                        d="M7.39 16.539a8 8 0 1 1 9.221 0l2.083 4.76a.5.5 0 0 1-.459.701H5.765a.5.5 0 0 1-.459-.7l2.083-4.761zm6.735-.693l1.332-.941a6 6 0 1 0-6.913 0l1.331.941L8.058 20h7.884l-1.817-4.154zM8.119 10.97l1.94-.485a2 2 0 0 0 3.882 0l1.94.485a4.002 4.002 0 0 1-7.762 0z"
                    />
                </svg>
            ),
            subs: [
                {
                    text: "Tambah Qariah",
                    name: "qariah.add",
                    url: "/qariah/add",
                },
                {
                    text: "Senarai Qariah",
                    name: "qariah",
                    url: "/qariah",
                },
            ],
        },
    ],
};

export const navCat = ["utama", "pengurusan"];
