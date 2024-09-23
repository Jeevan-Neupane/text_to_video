"use client";

import {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {Button} from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useSession, signIn} from "next-auth/react";
import {useToast} from "@/hooks/use-toast";
import {useRouter} from "next/navigation";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 3 characters.",
  }),
});

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const {toast} = useToast();

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    console.log(values);
    setIsLoading(true);
    try {
      const response = await signIn("credentials", {
        ...values,
        redirect: false,
      });
      if (response.error) {
        throw new Error(response.error);
      }
      form.reset();
      toast({
        title: "Success",
        description: "You have successfully logged in.",
      });
      router.push("/");
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error logging in",
        description: "Invalid email or password",
      });
    }
    setIsLoading(false);
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-64px)]">
      <div className="mx-auto max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Create your account to get started
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="johndoe@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormDescription>
                    Password must be at least 8 characters long.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
