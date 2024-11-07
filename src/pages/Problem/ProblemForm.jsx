/* eslint-disable react/prop-types */
import { Button, Form, Input, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import {
  generateProblem,
  generateSignedUrlForProblemImage,
  uploadToCloudinary,
} from "../../http/api";
import { useMutation, useQuery } from "@tanstack/react-query";

const ProblemForm = ({ setOpen }) => {
  const [file, setFile] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const addProblem = async (problemData) => {
    const { data } = await generateProblem(problemData);
    return data;
  };

  const handleFetchSignedUrl = async () => {
    const { data } = await generateSignedUrlForProblemImage();
    return data;
  };

  const { data: signedUrlData } = useQuery({
    queryKey: ["signed-url-for-problem-img"],
    queryFn: handleFetchSignedUrl,
    // staleTime: 60 * 60 * 1000,
    // cacheTime: 60 * 60 * 1000,
    // refetchOnWindowFocus: false,
  });

  const handleProblemImageUpload = async (fileData) => {
    const { data } = await uploadToCloudinary(fileData);
    return data;
  };

  console.log(signedUrlData);

  const {
    isPending: fileUploadPending,
    isError: fileUploadIsError,
    error: fileUploadError,
    data: uploadFileData,
    mutate: fileUploadMutate,
  } = useMutation({
    mutationFn: handleProblemImageUpload,
  });

  // console.log(data);

  const { mutate, isError, error, isPending } = useMutation({
    mutationFn: addProblem,
    onSuccess: (data) => {
      console.log(data);
      messageApi.open({
        type: "success",
        content: "Problem added successfully",
      });
      form.resetFields();
      setFile(null);
      setOpen(false);
    },
  });

  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const onFinish = async (values) => {
    if (!file) {
      console.log("No file selected");
      return;
    }

    const formData2 = new FormData();

    // Append the required parameters for the upload
    formData2.append("file", file);
    formData2.append("api_key", "432157195266338");
    formData2.append("timestamp", signedUrlData.timestamp);
    formData2.append("signature", signedUrlData.signature);

    console.log(formData2);

    // fileUploadMutate(formData2);

    try {
      let res = await fetch(
        // "https://api.cloudinary.com/v1_1/dfmuea3kz/image/upload",
        "https://api.cloudinary.com/v1_1/dfmuea3kz/upload",
        {
          method: "POST",
          body: formData2,
          // credentials: "include", // This is needed for sending credentials (cookies) in cross-origin requests
        }
      );

      const data = await res.json();
      console.log(data);
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("tag", "other");
      formData.append("imageSrc", data.url);
      mutate(formData);
    } catch (error) {
      console.log(error);
    }
  };

  if (isError) {
    console.log(error.message);
  }

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        name="problem-form"
        initialValues={{
          remember: true,
        }}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="image"
          label="Image"
          rules={[
            {
              required: true,
              message: "Please input your image!",
            },
          ]}
        >
          {file && (
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          )}
          <Input
            type="file"
            onChange={onFileChange}
            // value={file}
            placeholder="Image"
          />
        </Form.Item>
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please input your Title!",
            },
            {
              min: 4,
              max: 50,
              message: "Title must be between 4 and 50 characters!",
            },
          ]}
        >
          <Input placeholder="Title" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: "Please input your description!",
            },
            {
              min: 10,
              max: 100,
              message: "Title must be between 4 and 50 characters!",
            },
          ]}
        >
          <TextArea
            placeholder="Description"
            showCount
            maxLength={100}
            style={{
              height: 120,
              resize: "none",
            }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={fileUploadPending || isPending}
          >
            ADD
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default ProblemForm;
