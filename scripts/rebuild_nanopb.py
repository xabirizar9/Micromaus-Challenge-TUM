Import("env")

env.AddCustomTarget(
    name="nanopb",
    dependencies=None,
    actions=[
       " (cd proto; "
       "python ../.pio/libdeps/esp32-wlad-dev/Nanopb/generator/nanopb_generator.py  "
       "--strip-path --output-dir=../src message.proto)"
    ],
    title="Nanopb generate step",
    description="Rebuild .c/.h files from .proto"
    #always_build=True
)