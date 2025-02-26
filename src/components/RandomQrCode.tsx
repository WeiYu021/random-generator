// components/RandomQrCode/index.tsx
'use client'

import { useState, useEffect } from 'react'
import { useQRCode } from 'next-qrcode'  // 修改导入方式
import { useTranslations } from 'next-intl'
import { Link2, Mail, MessageSquare, Phone, Wifi, Text } from 'lucide-react'

type QrType = 'url' | 'email' | 'text' | 'sms' | 'tel' | 'wifi'

interface QrData {
    type: QrType
    content: string
}

const RandomQrCode = () => {
    const { Canvas } = useQRCode()  // 添加这行
    const t = useTranslations('qrcode')
    const [currentType, setCurrentType] = useState<QrType>('url')
    const [qrData, setQrData] = useState<QrData | null>(null)
    const [showQr, setShowQr] = useState(false)

    // 添加 useEffect 在组件加载时自动生成二维码
    useEffect(() => {
        handleGenerate()
    }, []) // 空数组表示只在组件加载时执行一次


    // 各类型生成逻辑（示例）
    const generators: Record<QrType, () => QrData> = {
        url: () => ({
            type: 'url',
            content: `https://randomqr.example/${Math.random().toString(36).substring(7)}`
        }),
        email: () => ({
            type: 'email',
            content: `MATMSG:TO:user${Math.floor(Math.random() * 1000)}@example.com;SUB:Random Subject ${Date.now()};BODY:Random email body;;`
        }),
        text: () => ({
            type: 'text',
            content: `Random text: ${Math.random().toString(36).substring(2, 15)}`
        }),
        sms: () => ({
            type: 'sms',
            content: `SMSTO:+${Math.floor(10000000000 + Math.random() * 90000000000)}:Random SMS message`
        }),
        tel: () => ({
            type: 'tel',
            content: `TEL:+${Math.floor(10000000000 + Math.random() * 90000000000)}`
        }),
        wifi: () => ({
            type: 'wifi',
            content: `WIFI:S:${btoa(Math.random().toString(36))};T:WPA;P:${Math.random().toString(36).substring(2)};;`
        })
    }

    const handleGenerate = () => {
        const generator = generators[currentType]
        setQrData(generator())
        setShowQr(true)
    }

    return (
        <div className="qr-generator space-y-6">
            <div className="controls flex flex-col space-y-4">
                <select
                    value={currentType}
                    onChange={(e) => setCurrentType(e.target.value as QrType)}
                    className="type-selector p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {Object.keys(generators).map((type) => (
                        <option key={type} value={type}>
                            {t(`${type}`)}
                        </option>
                    ))}
                </select>

                <button
                    onClick={handleGenerate}
                    className="generate-button px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                >
                    {t('generateButton')}
                </button>
            </div>

            {showQr && qrData && (
                <div className="qr-display flex flex-col items-center space-y-4">
                    <Canvas
                        text={qrData.content}
                        options={{
                            errorCorrectionLevel: 'H',
                            margin: 2,
                            scale: 4,
                            width: 256,
                            color: {
                                dark: '#000000ff',
                                light: '#ffffffff'
                            }
                        }}
                    />
                    <div className="qr-content bg-gray-100 dark:bg-gray-800 p-3 rounded-md text-sm break-all max-w-[300px]">
                        {qrData.type === 'url' && (
                            <div className="flex items-center gap-2">
                                <Link2 className="w-4 h-4" />
                                <a href={qrData.content} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                    {qrData.content}
                                </a>
                            </div>
                        )}
                        {qrData.type === 'email' && (
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                <p>{qrData.content.match(/TO:(.*?);/)?.[1]}</p>
                            </div>
                        )}
                        {qrData.type === 'sms' && (
                            <div className="flex items-center gap-2">
                                <MessageSquare className="w-4 h-4" />
                                <p>{qrData.content.match(/SMSTO:(.*?):/)?.[1]}</p>
                            </div>
                        )}
                        {qrData.type === 'tel' && (
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                <p>{qrData.content.match(/TEL:(.*)/)?.[1]}</p>
                            </div>
                        )}
                        {qrData.type === 'wifi' && (
                            <div className="flex items-center gap-2">
                                <Wifi className="w-4 h-4" />
                                <p>SSID: {qrData.content.match(/S:(.*?);/)?.[1]}</p>
                            </div>
                        )}
                        {qrData.type === 'text' && (
                            <div className="flex items-center gap-2">
                                <Text className="w-4 h-4" />
                                <p>{qrData.content}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

        </div>
    )
}

export default RandomQrCode