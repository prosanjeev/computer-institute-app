import DashboardLayout from "../../components/DashboardLayout";
import {
  Button,
  Flex,
  Icon,
  Image,
  Switch,
  useBreakpointValue,
  InputGroup,
  InputLeftElement,
  Input,
  Stack,
  Box,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { FaRegEdit } from "react-icons/fa";
import { RiImageEditLine } from "react-icons/ri";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchBranches, selectBranches } from "../../../redux/admin/branchSlice";
import usePhotoChange from "../../../../utils/usePhotoChange";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  useGlobalFilter,
} from "@tanstack/react-table";

const AllBranch = () => {
  const [search, setSearch] = useState("");
  const branches = useSelector(selectBranches);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handlePhotoChange } = usePhotoChange();

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  const handleChange = (e) => {
    setSearch(e.target.value);
    table.setGlobalFilter(e.target.value);
  };

  const handleStatusChange = (branchId, newStatus) => {
    // Implement your logic to update the status of the branch with ID branchId to newStatus
  };

  const isDesktop = useBreakpointValue({ base: false, md: true });

  const handleEditClick = (franchiseId) => {
    navigate("/update-branch", { state: { franchiseId } });
  };

  const data = useMemo(() => branches, [branches]);

  const columnHelper = createColumnHelper();

  const columns = useMemo(
    () => [
      columnHelper.accessor((row, i) => i + 1, {
        header: "Sr.",
      }),
      columnHelper.accessor((row) => new Date(row.createdAt).toLocaleDateString("en-GB"), {
        header: "Date",
      }),
      columnHelper.accessor("logoUrl", {
        header: "Logo",
        cell: (info) => (
          <Image
            src={info.getValue() || "https://static-00.iconduck.com/assets.00/info-icon-2048x2048-tcgtx810.png"}
            alt="Logo"
            w="40px"
            h="40px"
          />
        ),
      }),
      columnHelper.accessor("centerId", {
        header: "Branch Code",
      }),
      columnHelper.accessor("directorName", {
        header: "Name",
      }),
      columnHelper.accessor("centerName", {
        header: "Center Name",
      }),
      columnHelper.accessor("state", {
        header: "Section",
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => (
          <Switch
            isChecked={info.getValue() === "Active"}
            onChange={(e) => handleStatusChange(info.row.original.id, e.target.checked ? "Active" : "Inactive")}
            colorScheme={info.getValue() === "Active" ? "green" : "red"}
          />
        ),
      }),
      columnHelper.display({
        header: "Details",
        cell: (info) => (
          <Flex gap={1}>
            <Button
              size="sm"
              colorScheme="blue"
              onClick={() => handleEditClick(info.row.original.id)}
            >
              <Icon as={FaRegEdit} size="sm" color="white" />
            </Button>
            <Button
              size="sm"
              colorScheme="blue"
              onClick={() => {
                const fileInput = document.createElement("input");
                fileInput.type = "file";
                fileInput.accept = "image/*";
                fileInput.addEventListener("change", (e) => handlePhotoChange(info.row.original.userName, info.row.original.id, e));
                fileInput.click();
              }}
            >
              <Icon as={RiImageEditLine} size="sm" color="white" />
            </Button>
          </Flex>
        ),
      }),
      columnHelper.display({
        header: "Delete",
        cell: () => (
          <Button size="sm" colorScheme="red">Delete</Button>
        ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    useGlobalFilter: true,
  });

  const tableStyles = {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  };

  const thStyles = {
    padding: "10px",
    borderBottom: "1px solid black",
    background: "orange.400",
    fontWeight: "bold",
  };

  const tdStyles = {
    padding: "10px",
    borderBottom: "1px solid gray",
  };

  const paginationButtonStyles = (disabled) => ({
    display: disabled ? "none" : "inline-block",
    backgroundColor: disabled ? "gray" : "blue",
    color: "white",
    cursor: disabled ? "not-allowed" : "pointer",
  });

  return (
    <DashboardLayout title="Center List">
      <Stack mx={2}>
        <Flex>
          <InputGroup w="md" mb="4">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              value={search}
              onChange={handleChange}
              type="text"
              placeholder="Search ..."
              focusBorderColor="blue.500"
              bg="white"
              _placeholder={{ color: "gray.400" }}
              border="1px solid #d4cfcf"
              borderRadius="md"
              boxShadow="sm"
              _hover={{ boxShadow: "md" }}
            />
          </InputGroup>
        </Flex>
        <Box overflowX="auto">
          <table style={tableStyles}>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      style={thStyles}
                    >
                      {header.isPlaceholder ? null : (
                        <div {...{ onClick: header.column.getToggleSortingHandler() }}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted()] ?? null}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} style={tdStyles}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
        <Flex justifyContent="space-between" m={4} alignItems="center">
          <Button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            style={paginationButtonStyles(!table.getCanPreviousPage())}
          >
            {"<<"}
          </Button>
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            style={paginationButtonStyles(!table.getCanPreviousPage())}
          >
            {"<"}
          </Button>
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            style={paginationButtonStyles(!table.getCanNextPage())}
          >
            {">"}
          </Button>
          <Button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            style={paginationButtonStyles(!table.getCanNextPage())}
          >
            {">>"}
          </Button>
          <span>
            Page{" "}
            <strong>
              {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </strong>{" "}
          </span>
          <span>
            | Go to page:{" "}
            <Input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              style={{ width: "100px" }}
            />
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
          >
            {[2, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </Flex>
      </Stack>
    </DashboardLayout>
  );
};

export default AllBranch;
