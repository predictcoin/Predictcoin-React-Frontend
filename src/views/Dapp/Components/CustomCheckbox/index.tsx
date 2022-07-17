import { forwardRef } from "react";
import styled from "styled-components";

interface CheckboxProps {
    className?: string;
    color: string;
    background?: string;
    size?: string;
    radius?: string;
    strokeColor?: string;
    checkedColor?: string;
    checkedStrokeColor?: string;
}

const Checkbox = styled.div<CheckboxProps>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .checkboxx {
        margin: auto;
        -webkit-user-select: none;
        user-select: none;
        cursor: pointer;

        label{
            display: flex;
            justify-content: center;
            align-items: center;
        }

        span {
            display: inline-block;
            vertical-align: middle;
            transform: translate3d(0, 0, 0);
            &:first-child {
                position: relative;
                width: ${({size}) => size ?? "16px"};
                height: ${({ size }) => size ?? "16px"};
                border-radius: ${({ radius }) => radius ?? "2.7px"};
                transform: scale(1);
                vertical-align: middle;
                border: ${({ color }) => `1.5px solid ${color}`};
                background: ${({ background }) => background};
                transition: all 0.2s ease;
                svg {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    fill: none;
                    stroke: ${({ strokeColor }) => strokeColor ?? "#ffffff"};
                    stroke-width: 3.5px;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-dasharray: ${({size}) => size ?? "16px"};
                    stroke-dashoffset: ${({size}) => size ?? "16px"};
                    transition: all 0.3s ease;
                    transition-delay: 0.1s;
                    transform: translate3d(-50%, -50%, 0);
                }
                &:before {
                    content: "";
                    width: 100%;
                    height: 100%;
                    background: ${({ color }) => color};
                    display: block;
                    transform: scale(0);
                    opacity: 1;
                    border-radius: 50%;
                }
            }
            &:first-child {
                border: ${({ color }) => `1.5px solid ${color}`};
            }
        }
    }
    .checkbox-content {
        width: 100%;
        font-weight: 600;
        font-size: 12px;
        line-height: 18px;
        text-align: center;
        color: var(--text);
        margin-top: 0.5rem;
    }
    .inp-checkboxx {
        &:checked {
            + {
                .checkboxx {
                    span {
                        &:first-child {
                            background: ${({ color, checkedColor }) =>
                                checkedColor ?? color};
                            border-color: ${({ color, checkedColor }) =>
                                checkedColor ?? color};
                            animation: wave 0.4s ease;
                            svg {
                                stroke: ${({ checkedStrokeColor }) =>
                                    checkedStrokeColor ?? "#ffffff"};
                                stroke-dashoffset: 0;
                            }
                            &:before {
                                transform: scale(1.2);
                                opacity: 0;
                                transition: all 0.6s ease;
                            }
                        }
                    }
                }
            }
        }
    }
    @keyframes wave {
        50% {
            transform: scale(0.9);
        }
    }
`;

interface CustomCheckboxProps {
    id: string;
    name: string;
    disabled?: boolean;
    value?: string;
    color: string;
    background?: string;
    size?: string;
    radius?: string;
    strokeColor?: string;
    checkedColor?: string;
    checkedStrokeColor?: string;
    onChange?: (evt: any) => void;
    checked?:boolean;
}

const CustomCheckbox = forwardRef<HTMLInputElement, CustomCheckboxProps>(
    (
        {
            id,
            disabled,
            name,
            value,
            size,
            radius,
            color,
            background,
            strokeColor,
            checkedColor,
            checkedStrokeColor,
            onChange,
            checked
        },
        ref
    ) => {
        return (
            <Checkbox
                className="custom-checkbox"
                color={color}
                background={background}
                size={size}
                radius={radius}
                strokeColor={strokeColor}
                checkedColor={checkedColor}
                checkedStrokeColor={checkedStrokeColor}
            >
                <input
                    ref={ref}
                    className="inp-checkboxx"
                    name={name}
                    value={value}
                    id={id}
                    type="checkbox"
                    style={{ display: "none" }}
                    onChange={onChange}
                    checked={checked}
                    disabled={disabled}
                />
                <label className="checkboxx">
                    <label htmlFor={id}>
                        <span className="demo-check cursor-pointer">
                            <svg width="12px" height="10px" viewBox="0 0 12 10">
                                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                            </svg>
                        </span>
                    </label>
                </label>
            </Checkbox>
        );
    }
);

CustomCheckbox.displayName = "CustomCheckbox";

export default CustomCheckbox;
