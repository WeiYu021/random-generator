'use client';

import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion'; // 需要安装 framer-motion
import { useTranslations } from 'next-intl';

export default function TarotCard({ locale }: { locale: string }) {
    const t = useTranslations('tarotcard');
    console.log("locale", locale)
    const [isFlipped, setIsFlipped] = useState(false);
    const [currentCard, setCurrentCard] = useState('');
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isReverseEnabled, setIsReverseEnabled] = useState(false); // 新增状态
    const [isReversed, setIsReversed] = useState(false); // 新增状态
    const [isAnimationComplete, setIsAnimationComplete] = useState(true); // 新增状态

    const cards = [
        // 圣杯牌组 (Cups)
        'aceofcups', 'twoofcups', 'threeofcups', 'fourofcups', 'fiveofcups',
        'sixofcups', 'sevenofcups', 'eightofcups', 'nineofcups', 'tenofcups',
        'pageofcups', 'knightofcups', 'queenofcups', 'kingofcups',

        // 权杖牌组 (Wands)
        'aceofwands', 'twoofwands', 'threeofwands', 'fourofwands', 'fiveofwands',
        'sixofwands', 'sevenofwands', 'eightofwands', 'nineofwands', 'tenofwands',
        'pageofwands', 'knightofwands', 'queenofwands', 'kingofwands',

        // 宝剑牌组 (Swords)
        'aceofswords', 'twoofswords', 'threeofswords', 'fourofswords', 'fiveofswords',
        'sixofswords', 'sevenofswords', 'eightofswords', 'nineofswords', 'tenofswords',
        'pageofswords', 'knightofswords', 'queenofswords', 'kingofswords',

        // 钱币牌组 (Pentacles)
        'aceofpentacles', 'twoofpentacles', 'threeofpentacles', 'fourofpentacles', 'fiveofpentacles',
        'sixofpentacles', 'sevenofpentacles', 'eightofpentacles', 'nineofpentacles', 'tenofpentacles',
        'pageofpentacles', 'knightofpentacles', 'queenofpentacles', 'kingofpentacles',

        // 大阿卡纳牌组 (Major Arcana)
        'thefool', 'themagician', 'thehighpriestess', 'theempress', 'theemperor',
        'thehierophant', 'thelovers', 'thechariot', 'strength', 'thehermit',
        'wheelfortune', 'justice', 'thehangedman', 'death', 'temperance',
        'thedevil', 'thetower', 'thestar', 'themoon', 'thesun',
        'judgement', 'theworld'
    ];

    const getRandomCard = () => {
        return cards[Math.floor(Math.random() * cards.length)];
    };

    const flipCard = async () => {
        if (isLoading || !isAnimationComplete) return; // 添加检查

        if (!isFlipped) {
            setIsAnimationComplete(false); // 动画开始
            setIsLoading(true);
            setIsImageLoaded(false);
            const nextCard = getRandomCard();
            setCurrentCard(nextCard);
            setIsFlipped(true);
            setIsReversed(isReverseEnabled && Math.random() < 0.5);
            setIsLoading(false);
        } else {
            setIsFlipped(false);
        }
    };


    const toggleReverse = () => {
        setIsReverseEnabled(!isReverseEnabled);
    };

    return (
        <div className="flex flex-col items-center gap-4 md:gap-8">
            <div className="relative w-[195px] h-[325px] md:w-[300px] md:h-[500px] cursor-pointer perspective-1000">
                {/* 添加图片预加载 */}
                <link rel="preload" href="https://images.tarotcardgenerator.org/back.webp" as="image" />
                <link rel="preload" href="https://images.tarotcardgenerator.org/loading.webp" as="image" />
                {/* 调整文字位置，增加移动端间距 */}
                <div className={`absolute w-full text-center text-sm md:text-lg font-medium text-foreground px-2 ${isFlipped && isImageLoaded ? '-top-8 md:-top-10' : (locale === 'zh' ? '-top-8 md:-top-10' : '-top-11 md:-top-10')
                    }`}>
                    {isFlipped && isImageLoaded ? (
                        <span className="whitespace-nowrap">
                            {t(currentCard)}
                            {isReversed && ` ${t('reversed')}`}
                        </span>
                    ) : (
                        t("think")
                    )}
                </div>
                <motion.div
                    className="w-full h-full"
                    animate={{
                        rotateY: isFlipped ? 180 : 0,
                        scale: isFlipped ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    style={{ transformStyle: 'preserve-3d' }}
                    onClick={flipCard}
                    onAnimationComplete={() => {
                        if (!isFlipped) {
                            setCurrentCard('');
                            setIsImageLoaded(false);
                            setIsReversed(false); // 将重置逆位状态移动到这里
                        }
                        setIsAnimationComplete(true); // 动画完成
                    }}
                >
                    {/* 卡牌背面 */}
                    <div
                        className="absolute w-full h-full rounded-xl shadow-lg md:shadow-2xl"
                        style={{
                            backfaceVisibility: 'hidden',
                            background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.1) 100%)'
                        }}
                    >
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="w-6 h-6 md:w-8 md:h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full"
                                />
                            </div>
                        )}
                        <Image
                            src="https://images.tarotcardgenerator.org/back.webp"
                            alt="Tarot card back"
                            fill
                            style={{ objectFit: 'contain' }}
                            className="rounded-xl"
                            priority
                            quality={75}  // 降低图片质量以加快加载
                            sizes="(max-width: 768px) 195px, 300px"  // 根据设备宽度优化图片尺寸
                        />
                    </div>

                    {/* 卡牌正面 */}
                    <div
                        className="absolute w-full h-full rounded-xl shadow-lg md:shadow-2xl"
                        style={{
                            transform: `rotateY(180deg) ${isReversed ? 'rotate(180deg)' : ''}`,
                            backfaceVisibility: 'hidden',
                            background: currentCard && !isImageLoaded ? 'transparent' : 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.1) 100%)'
                        }}
                    >
                        {currentCard && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.3 }}
                                className="w-full h-full"
                            >
                                {!isImageLoaded && (
                                    <motion.div
                                        className="absolute inset-0"
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
                                    >
                                        <Image
                                            src="https://images.tarotcardgenerator.org/loading.webp"
                                            alt="Loading"
                                            fill
                                            style={{
                                                objectFit: 'contain',
                                                transform: isReversed ? 'rotate(180deg)' : 'none'
                                            }}
                                            className="rounded-xl"
                                            priority
                                            quality={75}
                                            sizes="(max-width: 768px) 195px, 300px"
                                        />
                                    </motion.div>
                                )}
                                <Image
                                    key={currentCard}  // 添加key强制重新渲染
                                    src={`https://images.tarotcardgenerator.org/${currentCard}.webp?t=${Date.now()}`}  // 添加时间戳
                                    alt={currentCard}
                                    fill
                                    style={{
                                        objectFit: 'contain',
                                        // transform: isReversed ? 'rotate(180deg)' : 'none'
                                    }}
                                    className="rounded-xl"
                                    onLoadingComplete={() => setIsImageLoaded(true)}
                                    quality={75}
                                    sizes="(max-width: 768px) 195px, 300px"
                                />
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
            {/* 新增按钮 */}
            <button
                onClick={toggleReverse}
                disabled={isFlipped}
                className={`px-4 py-2 rounded-lg transition-colors ${isFlipped
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-purple-500 hover:bg-purple-600'
                    } text-white`}
            >
                {isReverseEnabled ? t('withReverse') : t('withoutReverse')}
            </button>
        </div>
    );
}
