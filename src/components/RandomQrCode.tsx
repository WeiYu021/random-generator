// components/RandomQrCode/index.tsx
'use client'

import { useState } from 'react'
import { useQRCode } from 'next-qrcode'  // 修改导入方式
import { useTranslations } from 'next-intl'

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

    // 各类型生成逻辑（示例）
    const generators: Record<QrType, () => QrData> = {
        url: () => ({
            type: 'url',
            content: `https://randomqr.example/${Math.random().toString(36).substring(7)}`
        }),
        email: () => ({
            type: 'email',
            content: `MATMSG:TO:user${Math.floor(Math.random() * 1000)}@example.com;SUB:${t('randomSubject')} ${Date.now()};BODY:${t('randomBody')};;`
        }),
        text: () => ({
            type: 'text',
            content: `${t('randomText')} ${Math.random().toString(36).substring(2, 15)}`
        }),
        sms: () => ({
            type: 'sms',
            content: `SMSTO:+${Math.floor(10000000000 + Math.random() * 90000000000)}:${t('randomMessage')}`
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
        <div className="qr-generator">
            <div className="controls">
                <select
                    value={currentType}
                    onChange={(e) => setCurrentType(e.target.value as QrType)}
                    className="type-selector"
                >
                    {Object.keys(generators).map((type) => (
                        <option key={type} value={type}>
                            {t(`${type}`)}
                        </option>
                    ))}
                </select>

                <button
                    onClick={handleGenerate}
                    className="generate-button"
                >
                    {t('generateButton')}
                </button>
            </div>

            {showQr && qrData && (
                <div className="qr-display">
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
                    {/* ... existing code ... */}
                </div>
            )}
        </div>
    )
}

export default RandomQrCode