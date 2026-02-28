"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form } from "./ui/form"
import { Button } from "./ui/button"
import CustomInput from "./CustomInput"
import { authFormSchema } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { signIn, signUp } from "@/lib/actions/user.actions"


const AuthForm = ({type}: {type:string}) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();

    

    const formSchema = authFormSchema(type);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email:"",
            password:'',
            firstName: "",
            lastName: "",
            address1: "",
            city: "",
            state: "",
            postalCode: "",
            dateOfBirth: "",
            ssn: ""
        },
    })

    const onSubmit = async(data: z.infer<typeof formSchema>) => {
        setIsLoading(true)


        try {
            if(type==='sign-up') {
                const newUser = await signUp(data);

                setUser(newUser)
            }
            if(type==='sign-in'){
                const response = await signIn({
                    email:data.email,
                    password:data.password
               })

               if(response) router.push('/')
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    // Agrega esta función también
function onError(errors: any) {
    console.log("❌ Form errors:", errors)
}

const watchAllFields = form.watch(); 
console.log("Valores actuales del form:", watchAllFields);
console.log("Errores de validación:", form.formState.errors);

  return (
    <section className="auth-form">
        <header className="flex flex-col gap-5 md:gap-8">
            <Link href="/" className=" flex cursor-pointer items-center gap-1 ">
            <Image src="/icons/logo.svg" width={34} height={34} alt="BCRA logo" />
            <h1 className="text-26 font-imb-plex-serif font-bold text-black-1">BCRA</h1>
            </Link>
            <div className="flex flex-col gap-1 md:gap-3">
                <h1 className="text-24 lg:text-36 font-semibold text-grey-900">
                    {user ? 'Link Account' : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                <p className="text-16 font-normal text-gray-600">
                    {user ? 'Link your account to get started' : 'Please enter your details'}
                </p>
                </h1>
            </div>
        </header>
        {user ? (
            <div className="flex flex-col gap-4">

            </div>
        ) : (
            <>
                <Form {...form}>
                    <form onSubmit={(e) => {
                        console.log("Evento submit disparado");
                        form.handleSubmit(onSubmit, (errors) => {
                            console.log("Errores de Zod:", errors);
                        })(e);
                    }}
                    className="space-y-8">
                        {type === 'sign-up' && (
                        <>
                        <div className="flex lg:justify-between gap-4 items-center">
                        <CustomInput control={form.control} name='firstName' label='First Name' placeholder="Enter your first name" />
                        <CustomInput control={form.control} name='lastName' label='Last Name' placeholder="Enter your last name" />
                        
                        </div>
                        <CustomInput control={form.control} name='address1' label='Address' placeholder="Enter your address" />
                        <CustomInput control={form.control} name='city' label='city' placeholder="Enter your City" />

                        <div className="flex lg:justify-between gap-4 items-center">

                        <CustomInput control={form.control} name='state' label='State' placeholder="Example: BSAS" />
                        <CustomInput control={form.control} name='postalCode' label='Postal Code' placeholder="Example: 1010" />
                        </div>
                        <div className="flex lg:justify-between gap-4 items-center">

                        <CustomInput control={form.control} name='dateOfBirth' label='Date of Birth' placeholder="DD-MM-YYYY" />
                        <CustomInput control={form.control} name='ssn' label='SSN' placeholder="Example: 1234" />
                        </div>

                        </>
                        )}
                        
                        <CustomInput control={form.control} name='email' label='Email' placeholder="Enter your email" />
                        
                        
                        <CustomInput control={form.control} name='password' label='Password' placeholder='Enter your password'  />
                        
                    <div className="flex flex-col gap-4">
                        <Button type="submit" disabled={isLoading} className="form-btn">{isLoading ? (
                            <>
                                <Loader2 size={20} className="animate-spin"/> &nbsp; 
                                Loading...
                            </>
                        ) : type === 'sign-in' ? 'Sign In' : 'Sign up'}</Button>
                    </div>
                    </form>
                </Form>

                <footer className="flex justify-center gap-1">
                    <p className="text-14 font-normal text-gray-600">{type === 'sign-in' ? "Dont have an account?" : "Already have an account?"}</p>
                    <Link href={type==='sign-in' ? '/sign-up' : '/sign-in'} className="form-link">
                        {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
                    </Link>
                
                </footer>
            </>
        )}
    </section>
  )
}

export default AuthForm