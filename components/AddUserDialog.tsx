import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { User } from "@prisma/client";
import { formSchema } from "@/lib/formSchema/userSchema";

type AddUserDialogProps = {
  onAddUser: (data: z.infer<typeof formSchema>) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const AddUserDialog = ({
  onAddUser,
  isOpen,
  setIsOpen,
}: AddUserDialogProps) => {
  // Initialize form using react hook form
  // Used zod to validate form data
  // Please refer to shadcn for the guide on how to use zod with react hook form
  // formSchema can be found in lib/formSchema/userSchema.ts
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // Default values for the form
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onAddUser(values);
  }

  return (
    // Dialog open and onOpenChange is being controlled by the parent component
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button className="bg-primary text-white">Add User</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new User</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              // Name in each form field should match the key in the formSchema
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Input your email" {...field} />
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
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
