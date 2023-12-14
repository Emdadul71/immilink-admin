import {
  DatePicker,
  Input,
  Modal,
  Popconfirm,
  Select,
  Table,
  message,
} from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import type { ColumnsType } from "antd/es/table";
import dayjs, { Dayjs } from "dayjs";
import { Form, Formik } from "formik";
import moment from "moment";
import React, { ReactNode, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FiChevronRight, FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useGetAllCategoriesQuery } from "../../../appstore/post/categories/categories_api";
import {
  useDeletePostMutation,
  useGetPostsQuery,
} from "../../../appstore/post/post_api";
const frontendUrl = import.meta.env.VITE_FRONTEND_URL;

const { RangePicker } = DatePicker;

const rangePresets: {
  label: string;
  value: [Dayjs, Dayjs];
}[] = [
  { label: "Last 7 Days", value: [dayjs().add(-7, "d"), dayjs()] },
  { label: "Last 14 Days", value: [dayjs().add(-14, "d"), dayjs()] },
  { label: "Last 30 Days", value: [dayjs().add(-30, "d"), dayjs()] },
  { label: "Last 90 Days", value: [dayjs().add(-90, "d"), dayjs()] },
];

const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  // Can not select days before today and today
  let customDate = moment().subtract(90, "days").format("YYYY-MM-DD");
  return current && current < moment(customDate);
};
interface DataType {
  key: React.Key;
  id: any;
  title: string;
  slug: string;
  publishedAt: string;
  categories: any;
  tags: string;
  status: string;
  publishDate: string;
  publishTime: string;
  comments: ReactNode;
  action: ReactNode;
}

const PostList = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(7);
  const [keyword, setKeyword] = useState("");
  const [catKeyword, setCatKeyword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [moreCategory, setMoreCategory] = useState<any>();
  const [filtered, setFiltered] = useState({
    startDate: null,
    endDate: null,
    category: "",
    blogFor: "BANGLADESH",
    status: "ACTIVE",
  });

  const { data: categories, isFetching: catFaching } = useGetAllCategoriesQuery(
    {
      page: 1,
      limit: 15,
      title: catKeyword,
    }
  );
  const categoryOptions: any = categories?.data?.map((item: any) => {
    return {
      value: item?.slug,
      label: item?.title,
    };
  });
  const { data, isFetching } = useGetPostsQuery({
    title: keyword,
    startDate: filtered?.startDate,
    endDate: filtered?.endDate,
    category: filtered?.category,
    blogFor: filtered?.blogFor,
    status: filtered?.status,
    page: page,
    limit: limit,
  });
  const [deletId] = useDeletePostMutation();
  const confirm = async (id: any) => {
    try {
      const res: any = await deletId({
        type: "soft",
        id: id,
      });
      if (!res?.error) {
        message.success("Post delete successfully.");
      } else {
        if (res?.error?.status >= 500) {
          message.error("Somthing went wrong.");
        } else {
          message.error(
            `${
              res?.error?.data?.message
                ? res?.error?.data?.message
                : "Somthing went wrong"
            }`
          );
        }
      }
    } catch (err) {}
  };

  //  Pagination
  const paginationOptions = {
    showSizeChanger: true,
    showQuickJumper: true,
    defaultPageSize: limit,
    current: page,
    onChange: (page: any) => {
      setPage(page);
    },
    onShowSizeChange: (_: any, showItem: any) => {
      setLimit(showItem);
    },
    pageSizeOptions: [10, 20, 30, 50],
    total: data?.totalCount,
    showTotal: (total: number, range: any) =>
      `${range[0]} to ${range[1]} of ${total}`,
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Title",
      dataIndex: "title",
      width: "50%",
      render: (_, record) => {
        return <p className="line-clamp-1">{record?.title}</p>;
      },
    },
    {
      title: "Categories",
      dataIndex: "categories",

      render: (_, record) => {
        return (
          <div className="flex items-center gap-1">
            {record?.categories?.slice(0, 2).map((cat: any, i: any) => {
              return (
                <div className="inline-flex items-center gap-1.5">
                  <div className="inline-flex whitespace-nowrap items-center gap-4 bg-[#E2EDF9] px-3 py-1 rounded-full text-[#4E92DF] ">
                    {cat?.title}
                  </div>
                </div>
              );
            })}
            <span>
              {record?.categories?.length > 2 && (
                <button
                  onClick={() => {
                    setIsModalOpen(true);
                    setMoreCategory(record?.categories);
                  }}
                >
                  See More
                </button>
              )}
            </span>
          </div>
        );
      },
    },

    {
      title: "Published Time",
      dataIndex: "publishTime",

      render: (_, record) => {
        return <p>{moment(record?.publishedAt).format("LL")}</p>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",

      render: (_, record) => {
        return <p>{record?.status}</p>;
      },
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => {
        return (
          <div className="flex items-center gap-3">
            <Link to={`/posts/${record?.id}/edit`}>
              <FiEdit className="text-base" />
            </Link>
            {filtered.status === "ACTIVE" && (
              <a target="_blank" href={`${frontendUrl}/blog/${record.slug}`}>
                <FiEye className="text-base" />
              </a>
            )}

            <Popconfirm
              placement="top"
              title={<span>Are you sure to delete this task?</span>}
              description=" "
              onConfirm={() => confirm(record?.id)}
              okText="Yes"
              cancelText="No"
            >
              <button>
                <FiTrash2 className="text-base" />
              </button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  return (
    <div className="mt-3">
      <div className="flex items-center gap-2">
        <p>Dashboard</p>
        <FiChevronRight />
        <p>All Posts</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <h4 className="text-primary">Posts</h4>

        <Link to="/posts/add" className="btn btn-secondary">
          <span>ADD NEW</span>
        </Link>
      </div>
      <div className="w-full h-[1px] bg-[#E5E7EB] mt-4"></div>
      <div className="flex flex-col lg:flex-row justify-between items-center mt-6 my-4  gap-[10px] ">
        <div className="flex  gap-[10px]">
          <div className="flex  items-center gap-2">
            <Formik
              initialValues={{
                startDate: null,
                endDate: null,
                category: "",
                blogFor: "BANGLADESH",
                status: "ACTIVE",
              }}
              enableReinitialize={false}
              onSubmit={(values: any, actions: any) => {
                setFiltered({
                  startDate: values?.startDate,
                  endDate: values?.endDate,
                  category: values?.category,
                  blogFor: values?.blogFor,
                  status: values?.status,
                });
              }}
            >
              {({
                handleSubmit,
                setFieldValue,
                errors,
                values,
                touched,
              }: any) => (
                <Form>
                  <div className="flex gap-2 flex-wrap">
                    <div>
                      <RangePicker
                        presets={rangePresets}
                        onChange={(_, dateString) => {
                          setFieldValue("startDate", dateString[0]);
                          setFieldValue("endDate", dateString[1]);
                        }}
                        disabledDate={disabledDate}
                      />
                    </div>
                    <Select
                      showSearch
                      placeholder="Select category"
                      optionFilterProp="children"
                      loading={catFaching}
                      className="min-w-[150px]"
                      onChange={(val) => setFieldValue("category", val)}
                      onSearch={(e) => setCatKeyword(e)}
                      filterOption={(input: any, option: any) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={categoryOptions}
                    />
                    <Select
                      defaultValue={values?.blogFor}
                      placeholder="Select Country"
                      className="min-w-[150px]"
                      onChange={(value) => setFieldValue("blogFor", value)}
                      options={[
                        { value: "BANGLADESH", label: "Bangladesh" },
                        { value: "AUSTRALIA", label: "Australia" },
                      ]}
                      value={values.blogFor}
                    />
                    <Select
                      defaultValue={values?.status}
                      placeholder="Select status"
                      className="min-w-[150px]"
                      onChange={(value) => setFieldValue("status", value)}
                      options={[
                        { value: "ACTIVE", label: "Active" },
                        { value: "DRAFT", label: "Draft" },
                      ]}
                      value={values.status}
                    />
                    <button className="border py-[3px] px-[15px] rounded-[4px]">
                      Filter
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>

        <div className="lg:w-3/12 w-full relative">
          <Input
            type="text"
            placeholder="Search Posts"
            className="border pl-8 pr-5 py-1 rounded-[4px] w-full"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <BiSearch
            size={18}
            className="absolute top-[50%]  translate-y-[-50%] left-2"
          />
        </div>
      </div>
      <div className="overflow-auto">
        <Table
          rowKey={`id`}
          loading={isFetching}
          columns={columns}
          dataSource={data?.data}
          pagination={paginationOptions}
        />
      </div>
      <Modal
        title={
          <div className="flex items-center gap-2 px-6 py-4 border-b">
            <span>Category</span>
          </div>
        }
        open={isModalOpen}
        width={"100%"}
        style={{ maxWidth: 625, width: "100%", padding: 0 }}
        onCancel={() => setIsModalOpen(false)}
        footer={false}
      >
        <div className="px-6 py-4">
          <div className="flex flex-wrap gap-1.5 py-5">
            {moreCategory?.map((item: any, i: any) => {
              return (
                <div
                  key={i}
                  className="inline-flex items-center gap-4 bg-[#E2EDF9] px-3 py-1 rounded-full text-[#4E92DF]"
                >
                  {item.title}
                </div>
              );
            })}
          </div>
          <div className="flex justify-end gap-3">
            <button
              className="btn btn-grey"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PostList;
