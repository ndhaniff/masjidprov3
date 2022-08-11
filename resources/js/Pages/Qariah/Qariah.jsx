import React, { useState, useEffect } from "react";
import Admin from "./../../Layouts/Admin";
import { Inertia } from "@inertiajs/inertia";
import { Link, usePage } from "@inertiajs/inertia-react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import DataTable from "react-data-table-component";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import {
    Icon,
    Label,
    Menu,
    Table,
    Button,
    Dropdown,
    Form,
} from "semantic-ui-react";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { DateRangePicker } from "@mui/lab";
import { format, parse, parseISO } from "date-fns";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
});

const Qariah = () => {
    const { qariahs, url } = usePage().props;
    const [dateRange, setDateRange] = useState([null, null]);
    const [sortName, setSortName] = useState(false);
    const [name, setName] = useState(null);
    const [loading, setLoading] = useState(false);
    const [qariahData, setQariahData] = useState(qariahs.data);
    const [filterText, setFilterText] = React.useState("");
    const [resetPaginationToggle, setResetPaginationToggle] =
        React.useState(false);

    function truncate(str, n) {
        return str.length > n ? str.slice(0, n - 1) + "..." : str;
    }

    useEffect(() => {
        setQariahData(qariahs.data);
    }, [qariahs]);

    const dataStateChange = (state) => {
        console.log(state, "state");
    };

    const selectAction = (action, id) => {
        switch (action) {
            case "delete":
                Swal.fire({
                    icon: "warning",
                    text: "Adakah anda yakin",
                    showCancelButton: true,
                    customClass: {
                        confirmButton: "!bg-red-600",
                    },
                }).then((result) => {
                    if (result.value) {
                        Inertia.delete("/qariah/delete/" + id);
                        Toast.fire({
                            icon: "success",
                            title: "Telah dipadam",
                        });
                    }
                });
                break;
            default:
                Inertia.visit("/qariah/" + id, {
                    method: "get",
                    data: { panelMode: "edit" },
                });
        }
    };

    const resetParam = () => {
        Inertia.get(
            route("qariah"),
            {},
            { replace: true, preserveState: true }
        );
    };

    function handleParam(type, val, callback) {
        let data = {};
        if (type == "per_page") {
            data = { [val.name]: val.data, per_page: val.per_page };
        } else {
            data = { [val.name]: val.data };
        }
        Inertia.get(route("qariah"), data, {
            replace: true,
            preserveState: true,
            onSuccess: callback,
        });
    }

    const handleRowClick = (rowData) => {};

    const handleSort = (column, sortDirection) => {
        setLoading(true);

        handleParam(
            "sort",
            { name: column.sortField + "Sort", data: sortDirection },
            () => {
                setLoading(false);
            }
        );
    };

    const handlePageChange = (page) => {
        setLoading(true);

        handleParam("sort", { name: "page", data: page }, () => {
            setLoading(false);
        });
    };

    const handlePerRowsChange = (newPerPage, page) => {
        setLoading(true);

        handleParam(
            "per_page",
            { name: "page", data: page, per_page: newPerPage },
            () => {
                setLoading(false);
            }
        );
    };

    const handleDelete = (row) => {
        selectAction("delete", row.id);
    };
    const handleEdit = (row) => {
        selectAction("edit", row.id);
    };

    const handleClear = () => {
        if (filterText) {
            setResetPaginationToggle(!resetPaginationToggle);
            setFilterText("");
        }
    };

    const handleDateRangeFilter = (ev) => {
        setLoading(true);
        let start, end;
        let data = {};

        if (JSON.stringify(dateRange) != JSON.stringify([null, null])) {
            start = format(dateRange[0], "yyyy-MM-dd");
            end = format(dateRange[1], "yyyy-MM-dd");
            data["start"] = start;
            data["end"] = end;
        }

        if (
            filterText &&
            JSON.stringify(dateRange) != JSON.stringify([null, null])
        ) {
            data["name"] = filterText;
        }
        if (
            filterText &&
            JSON.stringify(dateRange) == JSON.stringify([null, null])
        ) {
            data["name"] = filterText;
        }

        Inertia.get(route("qariah"), data, {
            replace: true,
            preserveState: true,
            onSuccess: () => {
                setLoading(false);
                handleClear();
            },
        });
        setDateRange([null, null]);
        setName(null);
    };

    const subHeaderComponentMemo = React.useMemo(() => {
        return (
            <div className="flex gap-4 items-center justify-end">
                {/* --------------------------------- Search --------------------------------- */}
                <div className="flex">
                    <input
                        onChange={({ target: { value } }) =>
                            setFilterText(value)
                        }
                        value={filterText}
                        className="px-2 py-2.5 border border-gray-300"
                        type="text"
                        placeholder="Cari dengan nama"
                    />
                </div>
                {/* --------------------------------- Date Range --------------------------------- */}
                <div className="flex gap-4 items-center w-2/4 justify-between">
                    <div className="daterangepicker">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateRangePicker
                                startText="Dari"
                                endText="Sehingga"
                                value={dateRange}
                                inputFormat="dd/MM/yyyy"
                                onChange={(newValue) => {
                                    setDateRange(newValue);
                                }}
                                renderInput={(startProps, endProps) => (
                                    <React.Fragment>
                                        <TextField {...startProps} />
                                        <Box sx={{ mx: 1 }}> - </Box>
                                        <TextField {...endProps} />
                                    </React.Fragment>
                                )}
                            />
                        </LocalizationProvider>
                    </div>
                    <Button
                        type="submit"
                        primary
                        onClick={handleDateRangeFilter}
                    >
                        <div className="flex items-center">Tapis</div>
                    </Button>
                </div>
            </div>
        );
    }, [filterText, resetPaginationToggle, dateRange]);

    return (
        <div className="relative">
            <h1 className="mb-1">Senarai Ahli Qariah</h1>
            <p>Penduduk Qariah Cheruk Tokun Bawah</p>

            <div className="my-5 md:my-0 flex justify-end md:block md:absolute md:top-5 md:right-5">
                <Button
                    primary
                    onClick={() =>
                        Inertia.visit("/qariah/add", { method: "get" })
                    }
                >
                    <div className="flex items-center">
                        <svg
                            className="mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="15"
                            height="15"
                        >
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path
                                fill="currentColor"
                                d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
                            />
                        </svg>
                        Tambah
                    </div>
                </Button>
            </div>

            <DataTable
                pagination
                sortServer
                progressPending={loading}
                onSort={handleSort}
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
                paginationResetDefaultPage={resetPaginationToggle}
                paginationServer
                paginationTotalRows={qariahs.total}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
                persistTableHead
                columns={[
                    {
                        name: "Nama",
                        selector: (row) => row.name,
                        sortable: true,
                        sortField: "name",
                    },
                    {
                        name: "Alamat",
                        selector: (row) => row.address,
                        sortable: true,
                        sortField: "address",
                    },
                    {
                        name: "Jantina",
                        selector: (row) => row.sex_text,
                    },
                    {
                        name: "Dibuat Pada",
                        selector: (row) => row.created,
                        sortable: true,
                        sortField: "created_at",
                    },
                    {
                        name: "Jumlah Tanggungan",
                        selector: (row) => row.relative_count,
                        sortable: true,
                        sortField: "relative_count",
                        format: (row) => row.relative_count + " Orang",
                    },
                    {
                        name: "Aksi",
                        cell: (row) => (
                            <div className="flex gap-2">
                                <button
                                    className="text-md text-red-500"
                                    onClick={() => handleDelete(row)}
                                >
                                    <TooltipComponent
                                        content="Padam"
                                        position="BottomCenter"
                                    >
                                        <RiDeleteBin5Line />
                                    </TooltipComponent>
                                </button>
                                <button
                                    className="text-md"
                                    onClick={() => handleEdit(row)}
                                >
                                    <TooltipComponent
                                        content="Edit"
                                        position="BottomCenter"
                                    >
                                        <AiOutlineEdit />
                                    </TooltipComponent>
                                </button>
                            </div>
                        ),
                        ignoreRowClick: true,
                        allowOverflow: true,
                        button: true,
                    },
                ]}
                data={qariahData}
            />
        </div>
    );
};

Qariah.layout = (page) => <Admin children={page}></Admin>;

export default Qariah;
