import React, { useCallback, useEffect } from "react";
import { Button, Input, Select, RTE } from "../index";
import { get, useForm } from "react-hook-form";
import appwriteService from "../../appwrite/config";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function PostForm({ post }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    control,
    getValues,
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });
  const userData = useSelector((state) => state.auth.userData);
  console.log(userData);
  const submit = async (data) => {
    if (post) {
      const file = data?.image[0]
        ? await appwriteService.uploadFile(data?.image[0])
        : null;
      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (!dbPost) {
        toast.error("Something went wrong. Post not created/updated.");
      }
      if (dbPost) {
        toast.success("Post updated successfully");
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        //Console
        console.log("SUBMITTING POST DATA:", {
          ...data,
          userId: userData?.$id,
        });
        const dbPost = await appwriteService.createPost({
          title: data.title,
          featuredImage: fileId,
          status: data.status,
          slug: data?.slug || slugTransform(data.title),
          content: data.content,
          userId: userData.$id,
        });
        console.log("CREATED POST:", dbPost);
        if (dbPost) {
          toast.success("Post created successfully from PostForm");
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  // const slugTransform = useCallback((value) => {
  //   if (value && typeof value === "string")
  //     return value
  //       .trim()
  //       .toLocaleLowerCase()
  //       .replace(/^[a-zA-Z\d\s]+/g, "-")
  //       .replace(/\s/g, "-");

  //   return "";
  // }, []);
  const slugTransform = useCallback((value) => {
    return value
      ?.toString()
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title : "
          type="text"
          placeholder="Title"
          className="w-full focus:bg-[#c57460] duration-200 transition-all mb-4"
          {...register("title", {
            required: true,
          })}
          error={errors?.title?.message}
        />
        <Input
          label="Slug : "
          type="text"
          placeholder="Slug"
          className="w-full focus:bg-[#c57460] duration-200 transition-all mb-4"
          {...register("slug", {
            required: true,
          })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.target.value), {
              shouldValidate: true,
            });
          }}
          error={errors?.slug?.message}
        />
        <RTE
          label="Content : "
          control={control}
          name="content"
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image : "
          type="file"
          className="w-full focus:bg-[#c57460] duration-200 transition-all mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
          error={errors?.image?.message}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFileView(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status : "
          className="w-full focus:bg-[#c57460] duration-200 transition-all mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : "#ff7a59"}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
