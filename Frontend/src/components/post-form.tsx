"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import * as z from "zod";
import { CalendarIcon, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import axios from "axios";
import { useToast } from "../hooks/use-toast";
import { Button } from "./ui/button";
import { useAuth } from "../app/session/use-auth-context";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "../app/lib/utils";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { Textarea } from "./ui/textarea";

interface Data {
  title: string;
  location: string;
  description: string;
  rating: number;
  start_date: Date;
  end_date: Date;
}

const FormSchema = z.object({
  title: z.string().min(4, {
    message: " Title must be at least 4 characters.",
  }),
  location: z.string(),
  description: z.string().min(7, {
    message: " Description must be at least 7 characters.",
  }),
  start_date: z.date(),
  end_date: z.date(),
  rating: z.coerce
    .number()
    .int()
    .min(1, "Need a min of 1 star rating")
    .max(5, "Maximum rating is 5 stars"),
});

export default function PostForm() {
  const { login } = useAuth();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof FormSchema>) => {
      const reponse = await axios.post(
        "http://localhost:8080/api/v1/post/create",
        values
      );
      return reponse.data;
    },
    onSuccess: () => {
      login();
      toast({
        title: "Successfully logged in",
      });
    },
    onError: (error) => {
      console.log(error);

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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="title"
                  {...field}
                  type="title"
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input
                  placeholder="location"
                  {...field}
                  type="location"
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />{" "}
         <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about the trip"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="start_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="end_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <Input
                  placeholder="Pick a rating 1-5"
                  min={1}
                  max={5}
                  {...field}
                  type="number"
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
          {mutation.isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Create Post"
          )}
        </Button>
      </form>
    </Form>
  );
}
