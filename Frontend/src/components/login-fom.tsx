"use client"

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import axios from "axios";
import { useToast } from "../hooks/use-toast";
import { Button } from "./ui/button";
import { useAuth } from "../app/session/use-auth-context";

interface Data {
  username: string;
  password: string;
  confirm: string;
}

const FormSchema = z
  .object({
    username: z.string().min(7, {
      message: "Username must be at least 7 characters.",
    }),
    password: z.string().min(7, {
      message: "Username must be at least 7 characters.",
    }),
    confirm: z.string(),
  })
  .refine((data) => data.confirm === data.password, {
    message: "Password did not match",
    path: ["confirm"],
  });

export default function LoginForm() {


  const { login } = useAuth();


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof FormSchema>) => {
      const reponse = await axios.post("http://localhost:8080/api/user/login", values);
      return reponse.data;
    },
    onSuccess: () => {
      login()
      toast({
        title: "Successfully logged in",
      });

    
    },
    onError: (error) => {
      console.log(error)
      
      toast({
        title: "An error occurred.",
        description: "Unable to login to your account.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: Data) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Username"
                  {...field}
                  type="username"
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Password"
                  {...field}
                  type="password"
                  onChange={field.onChange}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Confirm Password"
                  {...field}
                  type="password"
                  onChange={field.onChange}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full flex gap-2"
          disabled={mutation.isPending}
        >
          {mutation.isPending? (
            <Loader2 className="animate-spin" />
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </Form>
  );
}
