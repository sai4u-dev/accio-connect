import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../features/posts/postThunks";

const TYPE_CONFIG = {
    text: {
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h10M4 18h14" />
            </svg>
        ),
        label: "Text",
    },
    image: {
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
            </svg>
        ),
        label: "Image",
    },
    video: {
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="23 7 16 12 23 17 23 7" />
                <rect x="1" y="5" width="15" height="14" rx="2" />
            </svg>
        ),
        label: "Video",
    },
};

export default function CreatePostModal({ isOpen, onClose }) {
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const textareaRef = useRef(null);

    const [contentType, setContentType] = useState("text");
    const [content, setContent] = useState("");
    const [file, setFile] = useState(null);
    const [caption, setCaption] = useState("");
    const [isLikeDisable, setIsLikeDisable] = useState(false);
    const [isCommentDisable, setIsCommentDisable] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            requestAnimationFrame(() => setVisible(true));
        } else {
            requestAnimationFrame(() => setVisible(false));
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && contentType === "text" && textareaRef.current) {
            setTimeout(() => textareaRef.current?.focus(), 50);
        }
    }, [isOpen, contentType]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (contentType === "text" && !content.trim()) return;
        if ((contentType === "image" || contentType === "video") && !content && !file) return;

        dispatch(
            createPost({
                contentType,
                content: file || content,
                caption,
                type: "post",
                isLikeDisable,
                isCommentDisable,
            })
        );

        resetForm();
        handleClose();
    };

    const handleClose = () => {
        setVisible(false);
        setTimeout(onClose, 220);
    };

    const resetForm = () => {
        setContent("");
        setFile(null);
        setCaption("");
        setIsLikeDisable(false);
        setIsCommentDisable(false);
        setContentType("text");
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const dropped = e.dataTransfer.files[0];
        if (!dropped) return;
        const isImage = dropped.type.startsWith("image/");
        const isVideo = dropped.type.startsWith("video/");
        if (isImage) { setContentType("image"); setFile(dropped); }
        else if (isVideo) { setContentType("video"); setFile(dropped); }
    };

    const previewSrc = file ? URL.createObjectURL(file) : content;
    const hasMedia = !!(file || content);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

                .cpm-overlay {
                    font-family: 'DM Sans', sans-serif;
                    position: fixed;
                    inset: 0;
                    backdrop-filter: blur(6px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    padding: 1rem;
                    opacity: 0;
                    transition: opacity 0.22s ease;
                }
                .cpm-overlay.visible {
                    opacity: 1;
                }
                .cpm-modal {
                    width: 100%;
                    max-width: 480px;
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 32px 64px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06);
                    transform: translateY(16px) scale(0.98);
                    transition: transform 0.24s cubic-bezier(0.34, 1.4, 0.64, 1);
                }
                .cpm-overlay.visible .cpm-modal {
                    transform: translateY(0) scale(1);
                }
                .cpm-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 20px 24px 0;
                }
                .cpm-title {
                    font-family: 'Instrument Serif', serif;
                    font-size: 22px;
                    color: #111;
                    letter-spacing: -0.3px;
                }
                .cpm-close {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    border: none;
                    background: #ebebeb;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.15s;
                    color: #555;
                }
                .cpm-close:hover { background: #ddd; color: #111; }

                .cpm-tabs {
                    display: flex;
                    gap: 6px;
                    padding: 16px 24px 0;
                }
                .cpm-tab {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                    padding: 8px 12px;
                    border-radius: 10px;
                    border: 1.5px solid transparent;
                    font-size: 13px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.15s;
                    background: #FFF;
                    color: #666;
                }
                .cpm-tab:hover { background: #e4e4e4; color: #333; }
                .cpm-tab.active {
                    background: #111;
                    color: #fff;
                    border-color: #111;
                }

                .cpm-body {
                    padding: 16px 24px 20px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .cpm-textarea {
                    width: 100%;
                    border: 1.5px solid #e8e8e8;
                    border-radius: 12px;
                    padding: 14px;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 15px;
                    font-weight: 300;
                    color: #111;
                    background: #fff;
                    resize: none;
                    outline: none;
                    transition: border-color 0.15s;
                    line-height: 1.6;
                    min-height: 120px;
                    box-sizing: border-box;
                }
                .cpm-textarea:focus { border-color: #aaa; }
                .cpm-textarea::placeholder { color: #bbb; }

                .cpm-drop-zone {
                    border: 1.5px dashed #d0d0d0;
                    border-radius: 14px;
                    padding: 28px 20px;
                    text-align: center;
                    cursor: pointer;
                    background: #fff;
                    transition: all 0.15s;
                }
                .cpm-drop-zone.dragging {
                    border-color: #111;
                    background: #f5f5f5;
                }
                .cpm-drop-zone:hover { border-color: #999; background: #fafafa; }
                .cpm-drop-icon {
                    width: 40px;
                    height: 40px;
                    background: #f0f0f0;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 10px;
                    color: #888;
                }
                .cpm-drop-label { font-size: 13px; color: #666; }
                .cpm-drop-label strong { color: #111; font-weight: 500; cursor: pointer; }
                .cpm-drop-label strong:hover { text-decoration: underline; }
                .cpm-drop-sub { font-size: 11px; color: #bbb; margin-top: 4px; }

                .cpm-divider {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 11px;
                    color: #bbb;
                    font-weight: 500;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                }
                .cpm-divider::before, .cpm-divider::after {
                    content: '';
                    flex: 1;
                    height: 1px;
                    background: #e8e8e8;
                }

                .cpm-url-input {
                    width: 100%;
                    border: 1.5px solid #e8e8e8;
                    border-radius: 10px;
                    padding: 10px 14px;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 13px;
                    color: #111;
                    background: #fff;
                    outline: none;
                    transition: border-color 0.15s;
                    box-sizing: border-box;
                }
                .cpm-url-input:focus { border-color: #aaa; }
                .cpm-url-input::placeholder { color: #bbb; }

                .cpm-preview-wrap {
                    position: relative;
                    border-radius: 12px;
                    overflow: hidden;
                    background: #111;
                }
                .cpm-preview-img {
                    width: 100%;
                    height: 180px;
                    object-fit: cover;
                    display: block;
                }
                .cpm-preview-vid {
                    width: 100%;
                    max-height: 180px;
                    display: block;
                    border-radius: 12px;
                }
                .cpm-preview-clear {
                    position: absolute;
                    top: 8px;
                    right: 8px;
                    width: 28px;
                    height: 28px;
                    background: rgba(0,0,0,0.55);
                    border: none;
                    border-radius: 50%;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    backdrop-filter: blur(4px);
                }
                .cpm-preview-clear:hover { background: rgba(0,0,0,0.8); }

                .cpm-caption {
                    width: 100%;
                    border: 1.5px solid #e8e8e8;
                    border-radius: 10px;
                    padding: 10px 14px;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 13px;
                    color: #111;
                    background: #fff;
                    outline: none;
                    transition: border-color 0.15s;
                    box-sizing: border-box;
                }
                .cpm-caption:focus { border-color: #aaa; }
                .cpm-caption::placeholder { color: #bbb; }

                .cpm-options {
                    display: flex;
                    gap: 16px;
                }
                .cpm-toggle {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 10px 14px;
                    border-radius: 10px;
                    border: 1.5px solid #e8e8e8;
                    background: #fff;
                    cursor: pointer;
                    transition: all 0.15s;
                    user-select: none;
                }
                .cpm-toggle:hover { border-color: #ccc; background: #fafafa; }
                .cpm-toggle.on { border-color: #111; background: #111; color: #fff; }
                .cpm-toggle-icon {
                    width: 18px;
                    height: 18px;
                    border-radius: 5px;
                    border: 1.5px solid #d0d0d0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    transition: all 0.15s;
                }
                .cpm-toggle.on .cpm-toggle-icon {
                    background: #fff;
                    border-color: #fff;
                    color: #111;
                }
                .cpm-toggle-label { font-size: 12.5px; font-weight: 500; color: #555; }
                .cpm-toggle.on .cpm-toggle-label { color: #e0e0e0; }

                .cpm-footer {
                    display: flex;
                    justify-content: flex-end;
                    gap: 8px;
                    padding: 0 24px 20px;
                }
                .cpm-btn-cancel {
                    padding: 10px 18px;
                    border-radius: 10px;
                    border: 1.5px solid #e0e0e0;
                    background: transparent;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    color: #666;
                    cursor: pointer;
                    transition: all 0.15s;
                }
                .cpm-btn-cancel:hover { background: #f0f0f0; border-color: #ccc; color: #333; }
                .cpm-btn-post {
                    padding: 10px 24px;
                    border-radius: 10px;
                    border: none;
                    background: #111;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    color: #fff;
                    cursor: pointer;
                    transition: all 0.15s;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                .cpm-btn-post:hover { background: #333; }
                .cpm-btn-post:disabled { opacity: 0.35; cursor: not-allowed; }
            `}</style>

            <div
                className={`cpm-overlay${visible ? " visible" : ""}`}
                onClick={(e) => e.target === e.currentTarget && handleClose()}
            >
                <div className="cpm-modal" role="dialog" aria-modal="true" aria-label="Create Post">
                    {/* Header */}
                    <div className="cpm-header">
                        <span className="cpm-title">New post</span>
                        <button className="cpm-close" onClick={handleClose} aria-label="Close">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M18 6 6 18M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="cpm-tabs">
                        {Object.entries(TYPE_CONFIG).map(([type, cfg]) => (
                            <button
                                key={type}
                                type="button"
                                className={`cpm-tab${contentType === type ? " active" : ""}`}
                                onClick={() => { setContentType(type); setContent(""); setFile(null); }}
                            >
                                {cfg.icon} {cfg.label}
                            </button>
                        ))}
                    </div>

                    {/* Body */}
                    <div className="cpm-body">
                        {/* Text */}
                        {contentType === "text" && (
                            <textarea
                                ref={textareaRef}
                                className="cpm-textarea"
                                rows="5"
                                placeholder="What's on your mind?"
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                            />
                        )}

                        {/* Image / Video */}
                        {(contentType === "image" || contentType === "video") && (
                            <>
                                {!hasMedia ? (
                                    <div
                                        className={`cpm-drop-zone${isDragging ? " dragging" : ""}`}
                                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                        onDragLeave={() => setIsDragging(false)}
                                        onDrop={handleDrop}
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <div className="cpm-drop-icon">
                                            {contentType === "image" ? (
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                                    <rect x="3" y="3" width="18" height="18" rx="2" />
                                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                                    <path d="m21 15-5-5L5 21" />
                                                </svg>
                                            ) : (
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                                    <polygon points="23 7 16 12 23 17 23 7" />
                                                    <rect x="1" y="5" width="15" height="14" rx="2" />
                                                </svg>
                                            )}
                                        </div>
                                        <div className="cpm-drop-label">
                                            Drop file or{" "}
                                            <strong onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>
                                                browse
                                            </strong>
                                        </div>
                                        <div className="cpm-drop-sub">
                                            {contentType === "image" ? "PNG, JPG, GIF, WEBP" : "MP4, MOV, WEBM"}
                                        </div>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept={contentType === "image" ? "image/*" : "video/*"}
                                            style={{ display: "none" }}
                                            onChange={(e) => setFile(e.target.files[0])}
                                        />
                                    </div>
                                ) : null}

                                {!file && (
                                    <>
                                        {hasMedia ? null : <div className="cpm-divider">or</div>}
                                        {!file && (
                                            <input
                                                type="url"
                                                placeholder={`Paste ${contentType} URL…`}
                                                className="cpm-url-input"
                                                value={content}
                                                onChange={(e) => setContent(e.target.value)}
                                            />
                                        )}
                                    </>
                                )}

                                {hasMedia && (
                                    <div className="cpm-preview-wrap">
                                        {contentType === "image" ? (
                                            <img src={previewSrc} alt="preview" className="cpm-preview-img" />
                                        ) : (
                                            <video controls className="cpm-preview-vid" src={previewSrc} />
                                        )}
                                        <button
                                            type="button"
                                            className="cpm-preview-clear"
                                            onClick={() => { setFile(null); setContent(""); }}
                                            aria-label="Remove media"
                                        >
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                <path d="M18 6 6 18M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                            </>
                        )}

                        {/* Caption */}
                        <input
                            type="text"
                            className="cpm-caption"
                            placeholder="Add a caption…"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />

                        {/* Options */}
                        <div className="cpm-options">
                            <div
                                className={`cpm-toggle${isLikeDisable ? " on" : ""}`}
                                onClick={() => setIsLikeDisable(!isLikeDisable)}
                                role="checkbox"
                                aria-checked={isLikeDisable}
                            >
                                <div className="cpm-toggle-icon">
                                    {isLikeDisable && (
                                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                            <path d="M20 6 9 17l-5-5" />
                                        </svg>
                                    )}
                                </div>
                                <span className="cpm-toggle-label">Hide likes</span>
                            </div>
                            <div
                                className={`cpm-toggle${isCommentDisable ? " on" : ""}`}
                                onClick={() => setIsCommentDisable(!isCommentDisable)}
                                role="checkbox"
                                aria-checked={isCommentDisable}
                            >
                                <div className="cpm-toggle-icon">
                                    {isCommentDisable && (
                                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                            <path d="M20 6 9 17l-5-5" />
                                        </svg>
                                    )}
                                </div>
                                <span className="cpm-toggle-label">Disable comments</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="cpm-footer">
                        <button type="button" className="cpm-btn-cancel" onClick={handleClose}>
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="cpm-btn-post"
                            onClick={handleSubmit}
                            disabled={
                                (contentType === "text" && !content.trim()) ||
                                ((contentType === "image" || contentType === "video") && !file && !content)
                            }
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                            Publish
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}