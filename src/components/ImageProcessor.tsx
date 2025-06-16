interface ImageProcessorProps {
    file: File | null;
}
function ImageProcessor(props: ImageProcessorProps) {
    return (
        <>
        <div>{props.file ? 'yes' : 'no'} </div>
        </>
    )
}

export default ImageProcessor