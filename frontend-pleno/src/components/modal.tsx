'use client'
import { Check, Eye, User, X } from "lucide-react"
import { Input } from "./input"
import { Button } from "./button"
import { useState } from "react"

interface ModalProps {
    showModal: boolean
    closeModal: () => void
}

export function Modal({ showModal, closeModal }: ModalProps) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')

    const [step, setStep] = useState(0)

    const cleanInputs = () => {
        setName('')
        setEmail('')
        setPhone('')
        setPassword('')
    }

    const handleRegister = () => {
        localStorage.setItem('flow-store', JSON.stringify([]));
        cleanInputs()
        document.location.reload()
    };

    return (
        <>
            {showModal ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none w-11/12 mx-auto">
                    <div className="relative w-full mx-auto max-w-3xl z-20">
                        <div className="relative flex flex-col mx-auto w-full lg:w-8/12 bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                            <div className="flex items-center gap-4 justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                                {step === 0 ? (
                                    <>
                                        <User className="text-primary" />
                                        <h3 className="text-xl text-gray-500">
                                            Cadastre-se
                                        </h3>
                                    </>
                                ) : (
                                    <>
                                        <Check className="text-primary" />
                                        <h3 className="text-xl text-gray-500">
                                            Sucesso
                                        </h3>
                                    </>
                                )}
                                <X className="ml-auto cursor-pointer hover:scale-110" onClick={closeModal} />
                            </div>
                            {step === 0 ? (
                                <div>
                                    <div className="relative flex flex-col gap-4 p-6 items-center">
                                        <Input
                                            className="border w-full bg-transparent rounded-lg px-2"
                                            placeholder="Nome completo"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        <Input
                                            className="border w-full bg-transparent rounded-lg px-2"
                                            placeholder="Email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <Input
                                            className="border w-full bg-transparent rounded-lg px-2"
                                            placeholder="Telefone"
                                            required
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                        <Input
                                            className="border w-full bg-transparent rounded-lg px-2"
                                            placeholder="Senha" type="password" icon={<Eye />}
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
                                        <Button onClick={() => setStep(1)} title="Criar minha conta" />
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className="relative flex flex-col gap-4 p-6 items-center">
                                        <div className="size-40 mx-auto bg-gray-400/50 rounded-full flex justify-center items-center">
                                            <Check className="size-12 text-white p-2 bg-primary rounded-full" />
                                        </div>
                                        <p className="text-xl font-semibold">Seu pedido foi concluído!</p>
                                        <span className="text-sm text-gray-400">Retornaremos com atualização em seu e-mail.</span>
                                    </div>
                                    <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
                                        <Button onClick={handleRegister} title="Entendi" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="fixed bottom-0 top-0 left-0 right-0 bg-black/50" onClick={closeModal} />
                </div>
            ) : null}
        </>
    )
}